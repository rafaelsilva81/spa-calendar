import { Router } from "express";
import { newTask, getTasks, getTaskById, getTaskByTitle, updateTask, deleteTask } from "../controllers/taskController";

const router = Router();


router.post("/tasks", newTask);
router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskById);
router.get("/tasks/title/:title", getTaskByTitle);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;