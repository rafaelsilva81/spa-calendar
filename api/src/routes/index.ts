import { Router } from "express";
import {
  newTask,
  getTasks,
  getTaskById,
  getTaskByTitle,
  updateTask,
  deleteTask,
  getTaskByDate,
} from "../controllers/taskController";

const router = Router();

router.post("/", newTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.get("/title/:title", getTaskByTitle);
router.get("/sort/:mode/:startDate", getTaskByDate);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
