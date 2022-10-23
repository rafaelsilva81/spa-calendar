import React from 'react';
import { TaskDTO } from '../../dto/Task';
import { DailyTaskCard } from '../common/DailyTaskCard';

interface IDailyCalendarProps {
  events: TaskDTO[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (task: TaskDTO) => void;
}
export const DailyCalendar = (props: IDailyCalendarProps) => {
  const { events, onDelete, onEdit } = props;

  return (
    <div className='flex flex-col'>
      {events.map((event: TaskDTO) => {
        return (
          <DailyTaskCard
            key={event.id}
            task={event}
            onDelete={onDelete}
            onEdit={() => onEdit(event)}
          />
        );
      })}
    </div>
  );
};
