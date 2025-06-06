import { Router } from "express";
import userRoutes from "./userRoutes";
import transactionRoutes from "./transactionRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/transactions", transactionRoutes);

export default router;
