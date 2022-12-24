import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "../../backend/src/server";

export const client = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === "development" ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: "http://localhost:4000/trpc",
    }),
  ],
});

export async function queryAllUser() {
  const users = await client.queryAllUser.query();
  return users;
}
export async function queryAllTodo() {
  const todos = await client.queryAllTodo.query();
  return todos;
}

export async function newTodo(content: string) {
  const todo = await client.createTodo.mutate({
    status: false,
    content: content,
    createdAt: new Date().toISOString(),
  });
  return todo;
}

export async function updateTodo(update) {
  await client.updateTodo.mutate(update);
}

export async function removeTodo(id: string) {
  return await client.deleteTodo.mutate(id);
}
