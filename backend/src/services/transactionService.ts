import prisma from "../lib/prisma";

export async function createTransaction(data: {
  userId: number;
  title: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: Date;
}) {
  return await prisma.transaction.create({
    data,
  });
}

export async function updateTransaction(id: number, data: Partial<{
  title: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: Date;
}>) {
  return await prisma.transaction.update({
    where: { id },
    data,
  });
}

export async function deleteTransaction(id: number) {
  return await prisma.transaction.delete({
    where: { id },
  });
}

export async function getUserTransactions(userId: number) {
  return await prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });
}

export async function getDashboardSummary(userId: number) {
  // Exemplo simples: soma receitas e despesas do usuário
  const incomeSum = await prisma.transaction.aggregate({
    where: { userId, type: "income" },
    _sum: { amount: true },
  });

  const expenseSum = await prisma.transaction.aggregate({
    where: { userId, type: "expense" },
    _sum: { amount: true },
  });

  return {
    totalIncome: incomeSum._sum.amount ?? 0,
    totalExpense: expenseSum._sum.amount ?? 0,
    balance: (incomeSum._sum.amount ?? 0) - (expenseSum._sum.amount ?? 0),
  };
}
