import prisma from "../lib/prisma";

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  return await prisma.user.create({
    data,
  });
}

export async function getUserById(id: number) {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function updateUser(id: number, data: Partial<{
  name: string;
  email: string;
  password: string;
}>) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

export async function deleteUser(id: number) {
  return await prisma.user.delete({
    where: { id },
  });
}
