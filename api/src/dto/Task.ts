interface TaskDTO {
  title: string;
  description?: string;
  start: Date | string;
  durationMinutes: number;
}

export { TaskDTO };
