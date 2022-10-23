import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { TaskDTO } from '../../dto/Task';
import { DailyTaskCard } from '../common/DailyTaskCard';

interface IWeeklyCalendarProps {
  selectedDate: Dayjs;
  events: TaskDTO[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (task: TaskDTO) => void;
}

export const WeeklyCalendar = (props: IWeeklyCalendarProps) => {
  const { events, onDelete, onEdit, selectedDate } = props;

  /* pegar os dias da semana com eventos */
  /* Sem duplicatas */
  const daysWithEvents = [
    ...new Set(
      events.map((event) => {
        return dayjs(event.start).date();
      })
    ),
  ];

  return (
    <>
      {daysWithEvents.map((day, i) => {
        const currentDay = dayjs(selectedDate).startOf('week').set('date', day);
        const eventsOnDay = events.filter((event) => {
          return dayjs(event.start).date() === day;
        });

        return (
          <div
            key={'day' + i}
            className='flex flex-row mb-3 mt-1'>
            <div className='flex justify-center mr-1 md:mr-2 items-start'>
              <div className='flex flex-col items-center bg-neutral-200 p-2 rounded-lg'>
                <span className='font-bold text-sm md:text-lg'>
                  {dayjs(currentDay).format('DD/MM')}
                </span>
                <span className='text-xs md:text-md'> {dayjs(currentDay).format('ddd')} </span>
              </div>
            </div>

            <div className='flex flex-col flex-auto items-center'>
              {eventsOnDay.map((event) => (
                <DailyTaskCard
                  key={event.id}
                  task={event}
                  onDelete={onDelete}
                  onEdit={() => onEdit(event)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};
