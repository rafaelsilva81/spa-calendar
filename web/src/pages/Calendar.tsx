import React, { useEffect, useRef, useState } from 'react';
import * as dayjs from 'dayjs';
import { ITaskDTO, TaskDTO } from '../dto/Task';
import api from '../services/api';
import { Navbar } from '../components/Navbar';
import { NewTaskModal } from '../components/NewTaskModal';
import { CalendarHeader } from '../components/CalendarHeader';
import { MonthlyCalendar } from '../components/MonthlyCalendar';
import { EditTaskModal } from '../components/EditTaskModal';
import { DailyCalendar } from '../components/DailyCalendar';
import { WeeklyCalendar } from '../components/WeeklyCalendar';

export const Calendar = () => {
  const [mode, setMode] = useState<'day' | 'week' | 'month'>('day');

  const [events, setEvents] = useState<TaskDTO[]>([]);

  const [selectedDate, setSelectedDate] = useState(dayjs().startOf(mode));

  const [showNewTask, setShowNewTask] = useState(false);
  const [showUpdateTask, setShowUpdateTask] = useState(false);

  const selectedTask = useRef<TaskDTO | undefined>(undefined);

  console.log('Selected  date: ' + selectedDate.format('DD/MM/YYYY'));

  useEffect(() => {
    loadEvents();
  }, [mode, selectedDate]);

  const loadEvents = async () => {
    api
      .get(`/sort/${mode}/${selectedDate}/`)
      .then(({ data }: { data: TaskDTO[] }) => {
        setEvents(data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleNewTask = async (data: ITaskDTO) => {
    api
      .post('/', data)
      .then(() => {
        setShowNewTask(false);
        loadEvents();
      })
      .catch((error) => {
        alert('Houve um erro ao criar a tarefa');
        console.log(error.response);
      });
  };

  const handleDelete = async (id: string) => {
    /* pedir confirmação do usuario */
    /* TODO: janelinha mais bonita */
    if (window.confirm('Tem certeza que deseja excluir essa tarefa?')) {
      api
        .delete(`/${id}`)
        .then(() => {
          loadEvents();
        })
        .catch((error) => {
          alert('Não foi possível excluir a tarefa');
          console.log(error.response);
        });
    }
  };

  const handleUpdate = async (id: string, data: ITaskDTO) => {
    api
      .put(`/${id}`, data)
      .then(() => {
        setShowUpdateTask(false);
        loadEvents();
      })
      .catch((error) => {
        alert('Não foi possível atualizar a tarefa');
        console.log(error.response);
      });

    selectedTask.current = undefined;
  };

  return (
    <>
      <Navbar
        mode={mode}
        setMode={setMode}
        setShowNewTask={() => setShowNewTask(true)}
      />

      <div
        id='calendar'
        className='p-6 mx-0 md:mx-8'>
        <div className='flex flex-col'>
          <CalendarHeader
            mode={mode}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          {/* Caso -> dia */}
          {mode === 'day' && (
            <DailyCalendar
              events={events}
              onDelete={handleDelete}
              onEdit={(task) => {
                selectedTask.current = task;
                setShowUpdateTask(true);
              }}
            />
          )}

          {/* Caso -> Semana */}
          {mode === 'week' && (
            <WeeklyCalendar
              selectedDate={selectedDate}
              events={events}
              onDelete={handleDelete}
              onEdit={(task) => {
                selectedTask.current = task;
                setShowUpdateTask(true);
              }}
            />
          )}

          {/* Caso -> mes */}
          {mode === 'month' && (
            <MonthlyCalendar
              events={events}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setMode={setMode}
            />
          )}
        </div>
      </div>

      {/* Modal task  (edição e criação) */}
      {showNewTask && (
        <NewTaskModal
          onCreate={handleNewTask}
          onClose={() => setShowNewTask(false)}
        />
      )}

      {showUpdateTask && selectedTask.current && (
        <EditTaskModal
          onUpdate={handleUpdate}
          onClose={() => setShowUpdateTask(false)}
          task={selectedTask.current}
        />
      )}
    </>
  );
};
