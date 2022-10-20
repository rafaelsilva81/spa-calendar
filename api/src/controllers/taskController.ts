import { Request, Response } from "express";
import taskService from "../services/taskService";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskByTitle = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getTaskByTitle(req.params.title);
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const newTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.createTask(
      req.body.title,
      req.body.description,
      req.body.start,
      req.body.end
    );
    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.body.title,
      req.body.description,
      req.body.start,
      req.body.end
    );
    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.deleteTask(req.params.id);
    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
