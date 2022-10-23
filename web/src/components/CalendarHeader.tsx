import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect } from 'react';
import { FaCaretRight, FaRegCalendarAlt } from 'react-icons/fa';

export const CalendarHeader = (props: { mode: 'day' | 'week' | 'month'; selectedDate: Dayjs }) => {
  const { mode, selectedDate } = props;
  const [header, setHeader] = React.useState<string>('');

  useEffect(() => {
    setHeader(
      mode === 'day'
        ? dayjs(selectedDate).startOf('day').format('ddd, DD [de] MMM [de] YYYY')
        : mode === 'week'
        ? dayjs().startOf('week').format('[Semana de] DD/MM [a] ') +
          dayjs().endOf('week').format('DD/MM')
        : dayjs(selectedDate).startOf('month').format('MMMM [de] YYYY')
    );
  }, [mode]);

  return (
    /* TODO: calendario ao abrir */
    <div className='flex items-center mb-2 text-lg md:text-2xl p-2 uppercase hover:text-primary-600 cursor-pointer hover:bg-neutral-200 rounded ease-linear transition-all'>
      <FaRegCalendarAlt size='20' />
      <h1 className='ml-2 font-bold'>{header} </h1>
      <FaCaretRight
        className='ml-1'
        size='20'
      />
    </div>
  );
};
