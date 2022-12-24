import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import superjson from "superjson";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create({ transformer: superjson });
export const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query((req) => {
    req.input; // string
    return { id: req.input, name: "Bilbo" };
  }),

  createUser: t.procedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (req) => {
      // use your ORM of choice
      return { id: req.input, name: "Frodo" };
    }),

  createTodo: t.procedure
    .input(
      z.object({
        content: z.string(),
        status: z.boolean(),
        createdAt: z.string().datetime(),
      })
    )
    .mutation(async (req) => {
      return await prisma.todo.create({
        data: req.input,
      });
    }),

  queryAllTodo: t.procedure.query(async () => {
    const todos = await prisma.todo.findMany();
    return todos;
  }),

  queryAllUser: t.procedure.query(async () => {
    const users = await prisma.user.findMany();
    return users;
  }),

  updateTodo: t.procedure
    .input(z.object({ id: z.string(), status: z.boolean() }))
    .mutation(async (req) => {
      return await prisma.todo.update({
        where: {
          id: req.input.id,
        },
        data: {
          status: req.input.status,
        },
      });
    }),

  deleteTodo: t.procedure.input(z.string()).mutation(async (req) => {
    return await prisma.todo.delete({
      where: {
        id: req.input,
      },
    });
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;

const app = express();
app.use(cors());
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
app.listen(4000, () => console.log("Listening on port 4000..."));
