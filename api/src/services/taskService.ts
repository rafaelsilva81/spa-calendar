import { PrismaClient } from "@prisma/client";
import { Task } from "@prisma/client";
import dayjs from "dayjs";

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

  getTaskByDate: async (
    startDate: string,
    mode: "day" | "week" | "month"
  ): Promise<Task[] | null> => {
    const start = dayjs(startDate);
    const end = start.add(1, mode);
    console.log(start.format("YYYY-MM-DD HH:mm:ss"));
    console.log(end.format("YYYY-MM-DD HH:mm:ss"));

    return await prisma.task.findMany({
      where: {
        start: {
          gte: dayjs(startDate).startOf(mode).toDate(),
          lte: dayjs(startDate).endOf(mode).toDate(),
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
