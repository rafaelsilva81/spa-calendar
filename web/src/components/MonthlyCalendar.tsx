import dayjs, { Dayjs } from 'dayjs';
import { TaskDTO } from '../dto/Task';
import React from 'react';
import { motion } from 'framer-motion';

interface IMonthViewProps {
  selectedDate: Dayjs;
  events: TaskDTO[];
  setSelectedDate: React.Dispatch<Dayjs>;
  setMode: React.Dispatch<'day' | 'week' | 'month'>;
}

export const MonthlyCalendar = (props: IMonthViewProps) => {
  const { selectedDate, setSelectedDate, setMode, events } = props;

  const daysInMonth = selectedDate.daysInMonth();
  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  const firstDayOfMonth = selectedDate.startOf('month').day();
  // 0 = domingo, 1 = segunda, 2 = terça, 3 = quarta, 4 = quinta, 5 = sexta, 6 = sábado

  const lastDayOfMonth = selectedDate.endOf('month').day();
  const daysBefore = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  /* Definir dias dos eventos */
  const daysWithEvents = events.map((event) => {
    return dayjs(event.start).date();
  });

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className='grid grid-cols-7 gap-1 w-full h-full'>
        {daysOfWeek.map((day, i) => (
          <div
            key={'day' + i}
            className='flex items-center justify-center w-full text-sm font-bold text-neutral-100 bg-primary-500 h-10 col-span-1'>
            {day}
          </div>
        ))}

        {/*  Marcar no grid dias em branco antes do inicio do mes) */}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          /* Exemplo: se o primeiro dia do mes for sabado (6), 6 quadrados em branco sao gerados */
          /* Se o primeiro dia do mes for domingo (0), Nenhum quadrado é gerado */
          <div
            key={'emptyBeginning' + i}
            className='flex items-center justify-center text-sm font-bold text-neutral-500 bg-neutral-200 w-full h-10 col-span-1'>
            {''}
          </div>
        ))}

        {/*  Marcar no grid os dias do mes */}
        {Array.from({ length: daysInMonth }, (_, i) => (
          <div
            key={'day' + i}
            onClick={() => {
              setSelectedDate(dayjs(selectedDate).startOf('month').add(i, 'day'));
              setMode('day');
            }}
            className='cursor-pointer 
            flex items-center justify-center text-sm font-bold text-neutral-500
            bg-neutral-200 w-full h-10 col-span-1 hover:bg-neutral-300'>
            <span className='mr-1'>{i + 1}</span>
            {daysWithEvents.includes(i + 1) && (
              /* Contar quantidade de vezes que o valor aparece */
              <span className='text-xs text-neutral-100 bg-primary-500 h-5 w-5 rounded-full'>
                <span className='flex items-center justify-center h-full'>
                  {daysWithEvents.filter((day) => day === i + 1).length}
                </span>
              </span>
            )}
          </div>
        ))}

        {/*  Marcar no grid dias em branco depois do fim do mes) */}
        {Array.from({ length: 6 - lastDayOfMonth }, (_, i) => (
          /* Exemplo: se o ultimo dia do mes for quinta (4), 2 quadrados em branco sao gerados */
          <div
            key={'emptyEnd' + i}
            className='flex items-center justify-center text-sm font-bold text-neutral-500 bg-neutral-200 w-full h-10 col-span-1'></div>
        ))}
      </motion.div>
    </div>
  );
};
