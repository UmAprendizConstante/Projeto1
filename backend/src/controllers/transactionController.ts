import { Request, Response } from "express";
import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getUserTransactions,
  getDashboardSummary,
} from "../services/transactionService";

export async function createTransactionController(req: Request, res: Response) {
  try {
    const { userId, title, type, amount, category, date } = req.body;
    const transactionDate = date ? new Date(date) : new Date();

    const transaction = await createTransaction({
      userId,
      title,
      type,
      amount,
      category,
      date: transactionDate,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to create transaction" });
  }
}

export async function updateTransactionController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { title, type, amount, category, date } = req.body;
    const updateData: any = { title, type, amount, category };
    if (date) updateData.date = new Date(date);

    const updatedTransaction = await updateTransaction(id, updateData);

    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to update transaction" });
  }
}

export async function deleteTransactionController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    await deleteTransaction(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
}

// NOVAS FUNÇÕES:

export async function getUserTransactionsController(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId);
    const transactions = await getUserTransactions(userId);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to get user transactions" });
  }
}

export async function getDashboardSummaryController(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId);
    const summary = await getDashboardSummary(userId);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: "Failed to get dashboard summary" });
  }
}
