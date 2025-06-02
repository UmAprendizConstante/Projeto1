import { Router } from "express";
import {
  createTransactionController,
  updateTransactionController,
  deleteTransactionController,
  getUserTransactionsController,
  getDashboardSummaryController,
} from "../controllers/transactionController";

const router = Router();

router.post("/", createTransactionController);
router.put("/:id", updateTransactionController);
router.delete("/:id", deleteTransactionController);
router.get("/user/:userId", getUserTransactionsController);
router.get("/dashboard/:userId", getDashboardSummaryController);

export default router;
