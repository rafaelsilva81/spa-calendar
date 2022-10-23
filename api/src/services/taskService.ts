import { PrismaClient } from '@prisma/client';
import { Task } from '@prisma/client';
import dayjs from 'dayjs';

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
    mode: 'day' | 'week' | 'month'
  ): Promise<Task[] | null> => {
    const start = dayjs(startDate);
    const end = start.add(1, mode);

    if (mode === 'week') {
      // Caso especial, pois a busca por semana é na verdade a busca dos proximos 7 dias (dependendo do dia selecionado)
      return await prisma.task.findMany({
        where: {
          start: {
            gte: dayjs(startDate).startOf('day').toDate(), // Primeiro dia da semana selecionada
            lte: dayjs(startDate).add(7, 'days').endOf('day').toDate(), //Somar 7 dias
          },
        },
        orderBy: {
          start: 'asc',
        },
      });
    } else {
      return await prisma.task.findMany({
        where: {
          start: {
            gte: dayjs(startDate).startOf(mode).toDate(),
            lte: dayjs(startDate).endOf(mode).toDate(),
          },
        },
        orderBy: {
          start: 'asc',
        },
      });
    }
  },

  createTask: async (title: string, description: string, start: Date, durationMinutes: number) => {
    await prisma.task
      .create({
        data: {
          title,
          description,
          start,
          durationMinutes,
        },
      })
      .then((task) => {
        return task;
      })
      .catch((error) => {
        throw error;
      });
  },

  updateTask: async (
    id: string,
    title: string,
    description: string,
    start: Date,
    durationMinutes: number
  ): Promise<Task> => {
    return await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        start,
        durationMinutes,
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
