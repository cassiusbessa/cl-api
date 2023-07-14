import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser() {
  const user = await prisma.user.create({
    data: {
      fullname: 'John Doe',
      email: 'any_email@email.com',
      password: 'any_password',
    },
  });
  console.log(user);
}

async function getAllUsers() {
  const users = await prisma.user.findMany();
  console.log(users);
}

createUser().then(() => getAllUsers());