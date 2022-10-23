import dayjs, { Dayjs } from 'dayjs';
import React, { Dispatch, useEffect, useRef } from 'react';
import { FaCaretRight, FaRegCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { DatePickerHeader } from './DatePickerHeader';

interface ICalendarHeaderProps {
  mode: 'day' | 'week' | 'month';
  selectedDate: Dayjs;
  setSelectedDate: Dispatch<Dayjs>;
}

export const CalendarHeader = (props: ICalendarHeaderProps) => {
  const { mode, selectedDate, setSelectedDate } = props;
  const [header, setHeader] = React.useState<string>('');

  const [miniCalendar, setMiniCalendar] = React.useState<boolean>(false);
  const miniCalendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeader(
      mode === 'day'
        ? dayjs(selectedDate)
            .startOf('day')
            .format('ddd, DD [de] MMM [de] YYYY')
        : mode === 'week'
        ? dayjs(selectedDate).startOf('day').format('[Semana de] DD/MM [a] ') +
          dayjs(selectedDate).add(7, 'days').endOf('day').format('DD/MM')
        : dayjs(selectedDate).startOf('month').format('MMMM [de] YYYY'),
    );
  }, [mode, selectedDate]);

  /* Detectar clique fora do mini calendario */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        miniCalendarRef.current &&
        !miniCalendarRef.current.contains(event.target as Node)
      ) {
        setMiniCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [miniCalendarRef]);

  return (
    <div className='flex items-center justify-between mb-2 text-lg md:text-2xl uppercase ease-linear transition-all'>
      <div className='flex flex-col md:flex-row md:items-center justify-start'>
        <div
          className='flex flex-col hover:text-primary-600 cursor-pointer hover:bg-neutral-200 md:p-2 rounded'
          onClick={() => setMiniCalendar(true)}
        >
          <div className='flex flex-auto items-center'>
            <h1 className='font-bold'>{header}</h1>
          </div>

          <div className='text-sm flex items-center'>
            Selecionar outra data
            <FaCaretRight className='ml-1' />
          </div>
        </div>

        <div
          className={`mt-1 md:ml-1 z-50 ${miniCalendar ? 'flex' : 'hidden'}`}
        >
          <div
            className={`absolute z-50 ${miniCalendar ? 'fixed' : 'hidden'}`}
            ref={miniCalendarRef}
          >
            <DatePicker
              id='mini-calendar'
              selected={selectedDate.toDate()}
              onChange={(date) => {
                setSelectedDate(dayjs(date));
              }}
              /* Se for semana, dar highlight nos proximos 7 dias */
              highlightDates={
                mode === 'week'
                  ? Array.from(Array(7).keys()).map((i) =>
                      dayjs(selectedDate)
                        .add(i + 1, 'days')
                        .toDate(),
                    )
                  : []
              }
              closeOnScroll={true}
              inline
              showMonthYearPicker={mode === 'month'}
              renderCustomHeader={(headerData) => (
                <DatePickerHeader {...headerData} mode={mode} />
              )}
            />
          </div>
        </div>
      </div>

      <div className='flex justify-center'>
        {mode === 'day' && !dayjs().isSame(selectedDate, mode) && (
          <button
            className='ml-2 text-sm md:text-base bg-primary-600 p-2 text-neutral-100 rounded-md w-8 md:w-20 text-center flex items-center justify-center'
            onClick={() => setSelectedDate(dayjs())}
          >
            <span className='hidden md:flex mr-1'> Hoje </span>
            <FaRegCalendarAlt size='18' />
          </button>
        )}
      </div>
    </div>
  );
};
