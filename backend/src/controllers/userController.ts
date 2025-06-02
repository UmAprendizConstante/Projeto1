import { Request, Response } from "express";
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/userService";

export async function createUserController(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const user = await createUser({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
}

export async function getUserController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to get user" });
  }
}

export async function updateUserController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { name, email, password } = req.body;
    const updatedUser = await updateUser(id, { name, email, password });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
}

export async function deleteUserController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    await deleteUser(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
}
