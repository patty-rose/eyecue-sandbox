import { PrismaClient } from '@prisma/client'//You import the PrismaClient constructor from the previously installed @prisma/client npm package.


const prisma = new PrismaClient()//You instantiate PrismaClient by calling the constructor and obtaining an instance called prisma.

async function main() {//You define an async function called main where you’ll add your Prisma Client queries.
  // ... your Prisma Client queries will go here

  const newUser = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {//use a nested write query to create both a User and Post record in the same query.
        create: {
          title: 'Hello World',
        },
      },
    },
  })
  console.log('Created new user: ', newUser)

  const allUsers = await prisma.user.findMany({
    include: { posts: true },
  })
  console.log('All users: ')
  console.dir(allUsers, { depth: null })
}//Reads all existing User records from the database. You provide the include option that additionally loads the related Post records for each User record.

main()//You call the main function, catching any potential exceptions and ensuring Prisma Client closes any open database connections with prisma.$disconnect().
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())