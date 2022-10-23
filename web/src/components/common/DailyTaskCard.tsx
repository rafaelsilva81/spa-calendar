import React, { useRef } from 'react';
import { FaClock, FaPenSquare, FaTrash } from 'react-icons/fa';
import { TaskDTO } from '../../dto/Task';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

interface IDailyTaskCardProps {
  task: TaskDTO;
  onDelete: (id: string) => Promise<void>;
  onEdit: () => void;
}

export const DailyTaskCard = (props: IDailyTaskCardProps) => {
  const { task, onDelete, onEdit } = props;

  const eventDetails = useRef<HTMLDivElement>(null);

  const showDetails = () => {
    const { current } = eventDetails;
    /* Mudar a visibilidade através da classe */
    current?.getAttribute('class') === 'hidden'
      ? current?.setAttribute('class', 'flex')
      : current?.setAttribute('class', 'hidden');
  };

  const start = dayjs(task.start);
  const end = dayjs(task.start).add(task.durationMinutes, 'minute');

  return (
    <motion.div
      transition={{ duration: 0.4 }}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      /* Animation on hover */
      className='flex w-full cursor-pointer'
      key={task.id}>
      {/* Event card */}
      <div
        className='flex flex-col flex-auto shadow rounded-lg bg-primary-600 mb-2 h-20 justify-center hover:bg-primary-500'
        onClick={showDetails}>
        <div className='flex flex-col mx-4 md:mx-8'>
          <div className='flex flex-col md:flex-row justify-between w-full md:items-center'>
            <h1 className='text-sm md:text-xl font-semibold text-neutral-100'>{task.title}</h1>
            <h1 className='text-sm md:text-xl font-semibold flex items-center text-neutral-100'>
              <FaClock className='text-xs' />
              <span className='ml-1'>
                {start.format('HH:mm')} - {end.format('HH:mm')}
              </span>
            </h1>
          </div>
          <div className='flex flex-row'>
            <h1 className='text-xs md:text-md truncate text-ellipsis text-neutral-100'>
              {task.description}
            </h1>
          </div>
        </div>
      </div>

      <motion.div
        initial='hidden'
        whileInView='visible'
        transition={{ duration: 0.3 }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
        id='details'
        className='hidden'
        ref={eventDetails}>
        {/* Edit card */}
        <div
          className='flex flex-col p-4 md:p-6 bg-yellow-500 hover:opacity-75 active:opacity-100 mb-1 h-20 justify-center flex-none rounded-l-lg ml-1 active:bg-yellow-400'
          onClick={() => {
            onEdit();
          }}>
          <div className='flex flex-row justify-between'>
            <h1 className='text-lg md:text-2xl font-semibold text-neutral-100 flex flex-col items-center'>
              <FaPenSquare />
              <span className='text-xs'> Editar </span>
            </h1>
          </div>
        </div>

        {/* Delete card */}
        <div
          className='flex flex-col p-4 md:p-6 bg-red-500 hover:opacity-75 active:opacity-100 mb-1 h-20 justify-center flex-none rounded-r-lg active:bg-red-400'
          onClick={() => {
            onDelete(task.id);
          }}>
          <div className='flex flex-row justify-between'>
            <h1 className='text-lg md:text-2xl font-semibold text-neutral-100 flex flex-col items-center'>
              <FaTrash />
              <span className='text-xs'> Excluir </span>
            </h1>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
