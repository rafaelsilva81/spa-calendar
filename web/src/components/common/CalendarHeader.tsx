import dayjs, { Dayjs } from 'dayjs';
import React, { Dispatch, useEffect, useRef } from 'react';
import { FaCaretRight, FaRegCalendarAlt } from 'react-icons/fa';

// TODO: talvez usar isso aqui https://flowbite.com/docs/plugins/datepicker/

interface ICalendarHeaderProps {
  mode: 'day' | 'week' | 'month';
  selectedDate: Dayjs;
  setSelectedDate: Dispatch<Dayjs>;
}

export const CalendarHeader = (props: ICalendarHeaderProps) => {
  const { mode, selectedDate, setSelectedDate } = props;
  const [header, setHeader] = React.useState<string>('');

  const miniCalendar = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setHeader(
      mode === 'day'
        ? dayjs(selectedDate).startOf('day').format('ddd, DD [de] MMM [de] YYYY')
        : mode === 'week'
        ? dayjs().startOf('week').format('[Semana de] DD/MM [a] ') +
          dayjs().endOf('week').format('DD/MM')
        : dayjs(selectedDate).startOf('month').format('MMMM [de] YYYY')
    );
  }, [mode, selectedDate]);

  const openMiniCalendar = () => {
    /* Trigger input date */
    miniCalendar.current?.showPicker();
  };

  return (
    /* TODO: calendario ao abrir */
    <div className='flex items-center justify-between mb-2 text-lg md:text-2xl uppercase ease-linear transition-all'>
      <div
        className='flex items-center justify-start hover:text-primary-600 cursor-pointer hover:bg-neutral-200 md:p-2 rounded'
        onClick={openMiniCalendar}>
        <input
          ref={miniCalendar}
          type='date'
          className='hidden'
          onChange={(e) => {
            setSelectedDate(dayjs(e.target.value));
          }}
          value={dayjs(selectedDate).format('YYYY-MM-DD')}
        />
        <h1 className='font-bold'>{header} </h1>
        <FaCaretRight
          className='ml-1'
          size='20'
        />
      </div>

      <div className='flex justify-center'>
        {mode === 'day' && !dayjs().isSame(selectedDate, mode) && (
          <button
            className='ml-2 text-sm md:text-base bg-primary-600 p-2 text-neutral-100 rounded-md w-8 md:w-20 text-center flex items-center justify-center'
            onClick={() => setSelectedDate(dayjs())}>
            <span className='hidden md:flex mr-1'> Hoje </span>
            <FaRegCalendarAlt size='18' />
          </button>
        )}
      </div>
    </div>
  );
};
