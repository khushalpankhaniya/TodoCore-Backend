import express from "express";
import { createTodo, getTodos, updateTodo, deleteTodo, getTodoById } from "../controllers/todo.controller.js";
import verifyToken from "../middlewares/jwt.js";
const router = express.Router();

router.get("/get", verifyToken, getTodos);
router.post("/create", verifyToken, createTodo);
router.put("/update/:id", verifyToken, updateTodo);
router.delete("/delete/:id", verifyToken, deleteTodo);
router.get("/get/:id", verifyToken, getTodoById);

export default router;  