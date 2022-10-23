import React, { Dispatch } from 'react';
import { FaCalendarCheck, FaSearch, FaPlus } from 'react-icons/fa';

interface INavbarProps {
  mode: 'day' | 'week' | 'month';
  setMode: Dispatch<'day' | 'week' | 'month'>;
  setShowNewTask: Dispatch<boolean>;
}
export const Navbar = (props: INavbarProps) => {
  const { mode, setMode, setShowNewTask } = props;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value as 'day' | 'week' | 'month');
  };

  return (
    <div
      id='navbar'
      className='flex justify-between p-2 h-14 items-center bg-neutral-200'>
      <div
        className='ml-4 items-center text-primary-600 cursor-pointer hidden md:flex'
        onClick={() => setMode('day')}>
        <FaCalendarCheck size='24' />
        <h1 className='ml-2 text-xl'> MyCalendar </h1>
      </div>

      <div className='flex flex-auto flex-wrap mx-2 md:mx-10'>
        <div className='flex w-full wrap items-center'>
          <FaSearch className='text-primary-600' />
          <input
            className='ml-2 px-2 p-1 rounded-md w-full bg-neutral-100 border focus:outline-none focus:outline-primary-600'
            type='text'
            placeholder='Pesquisar'
          />
        </div>
      </div>

      <div className='flex justify-between mr-4'>
        <div className='flex items-center'>
          <select
            value={mode}
            name='dateViewer'
            id='dateViewer'
            className='ml-2 h-10 p-1 rounded-md bg-neutral-100 border-2 focus:border-primary-600'
            onChange={handleChange}>
            <option
              value='day'
              className=''>
              Dia
            </option>
            <option value='week'>Semana</option>
            <option value='month'>Mês</option>
          </select>
        </div>

        <div className='flex items-center justify-center'>
          <button
            name='newEvent'
            id='newEvent'
            className='ml-2 h-10 w-8 md:w-20 p-1 rounded-md bg-neutral-100  border-2 focus:border-primary-600'
            onClick={() => setShowNewTask(true)}>
            <div className='flex items-center justify-center'>
              <span className='md:mr-1 text-xs'>
                <FaPlus />
              </span>
              <span className='text-sm hidden md:block'>Novo</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
