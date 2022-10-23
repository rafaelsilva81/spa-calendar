export type TaskDTO = {
  id: string;
  title: string;
  description?: string;
  start: string;
  durationMinutes: number;
};

export type ITaskDTO = {
  id?: string;
  title: string;
  description?: string;
  start: string;
  durationMinutes: number;
};
