import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ITaskDTO, TaskDTO } from '../../dto/Task';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaTimes } from 'react-icons/fa';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import * as yup from 'yup';

interface IEditTaskModalProps {
  onUpdate: (id: string, task: ITaskDTO) => Promise<void>;
  onClose: () => void;
  task: TaskDTO;
}

interface FormInputs {
  id?: string;
  title: string;
  description: string;
  day: string;
  start: string;
  end: string;
}

const schema = yup.object().shape({
  title: yup.string().required('Esse campo é obrigatório'),
  description: yup.string().max(50, 'Máximo de 50 caracteres'),
  day: yup.date().required('Esse campo é obrigatório'),
  start: yup.string().required('É necessário informar a hora de início'),
  end: yup.string().required('É necessário informar a hora de término'),
});

export const EditTaskModal = (props: IEditTaskModalProps) => {
  dayjs.extend(duration);
  dayjs.extend(customParseFormat);

  const { onClose, onUpdate, task } = props;

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: task.title,
      description: task.description,
      day: dayjs(task.start).format('YYYY-MM-DD'),
      start: dayjs(task.start).format('HH:mm'),
      end: dayjs(task.start).add(task.durationMinutes, 'minute').format('HH:mm'),
    },
  });

  const onSubmit = async (data: FormInputs) => {
    setLoading(true);
    const { title, description, day, start, end } = data;

    /* Checar se a hora final é antes da inicial */ if (
      dayjs(end, 'HH:mm').isBefore(dayjs(start, 'HH:mm'))
    ) {
      setError('end', {
        type: 'manual',
        message: 'A hora final deve ser depois da inicial',
      });
      setLoading(false);
      return;
    }

    /* Construir o objeto */
    const durationMinutes = dayjs
      .duration(dayjs(end, 'HH:mm').diff(dayjs(start, 'HH:mm')))
      .asMinutes();

    const startingDate = dayjs(day)
      .startOf('day')
      .set('hour', dayjs(start, 'HH:mm').hour())
      .set('minute', dayjs(start, 'HH:mm').minute())
      .toISOString();

    console.log(durationMinutes);
    const newTask = {
      title,
      description,
      start: startingDate,
      durationMinutes,
    };

    await onUpdate(task.id, newTask);
    setLoading(false);
  };

  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className='relative my-6 mx-auto w-full p-2 md:p-0 md:w-1/3'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-start justify-between p-2 bg-neutral-200 rounded-t'>
              <span className='text-lg font-semibold tex-neutral-800 ml-3'>Editar tarefa</span>
              <button
                className='text-neutral-800 opacity-75 text-xl mr-3 font-semibold rounded-full bg-transparent hover:bg-neutral-300 p-1
                active:text-primary-600'
                onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            {/*body*/}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='relative p-6 flex-auto'>
                <div className='flex flex-wrap w-full'>
                  <input
                    {...register('title')}
                    className='shadow border text-lg rounded-md w-full p-2 text-gray-700 focus:outline-none focus:outline-primary-500'
                    type='text'
                    placeholder='Título da tarefa'
                  />
                  {errors.title && (
                    <span className='text-red-500 text-sm mt-1'>{errors.title.message}</span>
                  )}
                </div>

                <div className='flex flex-wrap w-full mt-4'>
                  <input
                    {...register('description')}
                    className='shadow border text-sm rounded-md w-full p-2 text-gray-700 focus:outline-none focus:outline-primary-500'
                    placeholder='Descrição da tarefa'
                  />
                  {errors.description && (
                    <span className='text-red-500 text-sm mt-1'>{errors.description.message}</span>
                  )}
                </div>

                <div className='flex flex-wrap mt-4'>
                  <input
                    {...register('day')}
                    className='shadow border text-sm rounded-md w-full p-2 text-gray-700 focus:outline-none focus:outline-primary-500'
                    type='date'
                    placeholder='Data'
                  />
                  {errors.day && (
                    <span className='text-red-500 text-sm mt-1'>{errors.day.message}</span>
                  )}
                </div>

                <div className='flex flex-wrap mt-4'>
                  <div className='flex flex-auto'>
                    <input
                      {...register('start')}
                      className='shadow border w-full text-sm rounded-md p-2 text-gray-700 focus:outline-none focus:outline-primary-500'
                      type='time'
                      placeholder='Início'
                    />
                  </div>
                  <div className='flex w-6 items-center justify-center'>
                    <span className='text-sm text-neutral-800 font-bold'>–</span>
                  </div>

                  <div className='flex flex-auto'>
                    <input
                      {...register('end')}
                      className='shadow border w-full text-sm rounded-md p-2 text-gray-700 focus:outline-none focus:outline-primary-500'
                      type='time'
                      placeholder='Fim'
                    />
                  </div>
                </div>

                <div className='flex flex-col flex-auto'>
                  {errors.start && (
                    <span className='text-red-500 text-sm mt-1'>{errors.start.message}</span>
                  )}
                  {errors.end && (
                    <span className='text-red-500 text-sm mt-1'>{errors.end.message}</span>
                  )}
                </div>
              </div>

              {/*footer*/}
              <div className='flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b mx-3'>
                <button
                  className='text-red-500 background-transparent
                                            hover:bg-neutral-300 rounded
                                            font-bold uppercase px-4 py-2 text-sm outline-none 
                                            focus:outline-none mr-1 mb-1 ease-linear transition-all 
                                            duration-150
                                            disabled:opacity-50'
                  type='button'
                  disabled={loading}
                  onClick={() => onClose()}>
                  Cancelar
                </button>
                <button
                  className='bg-primary-500 text-white active:bg-primary-700
                                            hover:bg-primary-600
                                            font-bold uppercase text-sm px-4 py-2 rounded 
                                            shadow hover:shadow-lg outline-none 
                                            focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150
                                            disabled:opacity-50'
                  type='submit'
                  disabled={loading}>
                  Confirmar edição
                </button>
                {loading ? (
                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900'></div>
                ) : null}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  );
};
