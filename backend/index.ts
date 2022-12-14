import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Connect the client
  await prisma.$connect();

  // await prisma.user.create({ // Create new user and insert a post.
  //   data: {
  //     name: 'Rich',
  //     email: 'hello@prisma.com',
  //     posts: {
  //       create: {
  //         title: 'My first post',
  //         body: 'Lots of really interesting stuff',
  //         slug: 'my-first-post',
  //       },
  //     },
  //   },
  // })

  // await prisma.post.update({ // Update post with comments
  //   where: {
  //     slug: "my-first-post",
  //   },
  //   data: {
  //     comments: {
  //       createMany: {
  //         data: [
  //           { comment: "Great post!" },
  //           { comment: "Can't wait to read more!" },
  //         ],
  //       },
  //     },
  //   },
  // });

  // const posts = await prisma.post.findMany({
  //   include: {
  //     comments: true,
  //   },
  // });
  // console.dir(posts, { depth: Infinity });

  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     posts: true,
  //   },
  // });
  // console.dir(allUsers, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
