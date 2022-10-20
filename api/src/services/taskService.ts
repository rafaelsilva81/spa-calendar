import { PrismaClient } from "@prisma/client";
import { Task } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  getAllTasks: async (): Promise<Task[]> => {
    return await prisma.task.findMany();
  },

  getTaskById: async (id: string): Promise<Task | null> => {
    return await prisma.task.findUnique({
      where: {
        id: id,
      },
    });
  },

  getTaskByTitle: async (title: string): Promise<Task[] | null> => {
    return await prisma.task.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });
  },

  createTask: async (
    title: string,
    description: string,
    start: Date,
    end: Date
  ): Promise<Task> => {
    return await prisma.task.create({
      data: {
        title,
        description,
        start,
        end,
      },
    });
  },

  updateTask: async (
    id: string,
    title: string,
    description: string,
    start: Date,
    end: Date
  ): Promise<Task> => {
    return await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        start,
        end,
      },
    });
  },

  deleteTask: async (id: string): Promise<Task> => {
    return await prisma.task.delete({
      where: {
        id: id,
      },
    });
  },
};
