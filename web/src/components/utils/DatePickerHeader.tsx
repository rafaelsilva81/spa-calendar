import React from 'react';
import dayjs from 'dayjs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface IDatePickerHeaderProps {
  date: Date;
  mode?: 'day' | 'week' | 'month';
  decreaseMonth: () => void;
  increaseMonth: () => void;
  increaseYear: () => void;
  decreaseYear: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  prevYearButtonDisabled: boolean;
  nextYearButtonDisabled: boolean;
}
export const DatePickerHeader = (props: IDatePickerHeaderProps) => {
  const {
    date,
    mode = 'day', // day, week, month (default: day)
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
    decreaseYear,
    increaseYear,
    prevYearButtonDisabled,
    nextYearButtonDisabled,
  } = props;

  const prevButtonDisabled =
    mode === 'month' ? prevYearButtonDisabled : prevMonthButtonDisabled;
  const nextButtonDisabled =
    mode === 'month' ? nextYearButtonDisabled : nextMonthButtonDisabled;

  const decrease = mode === 'month' ? decreaseYear : decreaseMonth;
  const increase = mode === 'month' ? increaseYear : increaseMonth;

  const header =
    mode === 'month'
      ? dayjs(date).format('YYYY')
      : dayjs(date).format('MMM/YYYY');

  return (
    <div className='flex items-center justify-between p-2'>
      <button
        className={`p-2 bg-neutral-300 hover:bg-neutral-200 active:bg-neutral-300 rounded text-primary-500 hover:text-primary-400 ${
          prevButtonDisabled && 'cursor-not-allowed text-neutral-300'
        }`}
        onClick={decrease}
        disabled={prevMonthButtonDisabled}
      >
        <FaChevronLeft className='text-sm md:text-lg' />
      </button>
      <h1 className='text-lg md:text-xl font-semibold'>{header}</h1>
      <button
        className={`p-2 bg-neutral-300 hover:bg-neutral-200 active:bg-neutral-300 rounded text-primary-500 hover:text-primary-400 ${
          nextButtonDisabled && 'cursor-not-allowed text-neutral-300'
        }`}
        onClick={increase}
        disabled={nextMonthButtonDisabled}
      >
        <FaChevronRight className='text-sm md:text-lg' />
      </button>
    </div>
  );
};
