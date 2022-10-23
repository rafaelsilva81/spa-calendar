import React, { useEffect, useRef, useState } from 'react';
import * as dayjs from 'dayjs';
import { ITaskDTO, TaskDTO } from '../dto/Task';
import api from '../services/api';
import { Navbar } from '../components/Navbar';
import { FaRegCalendarAlt, FaCaretRight } from 'react-icons/fa';
import { DailyTaskCard } from '../components/DailyTaskCard';
import { NewTaskModal } from '../components/NewTaskModal';
import { CalendarHeader } from '../components/CalendarHeader';
import { MonthView } from '../components/MonthView';
import { EditTaskModal } from '../components/EditTaskModal';

export const Calendar = () => {
  const [mode, setMode] = useState<'day' | 'week' | 'month'>('day');

  const [events, setEvents] = useState<TaskDTO[]>([]);

  const [selectedDate, setSelectedDate] = useState(dayjs().startOf(mode));

  const [showNewTask, setShowNewTask] = useState(false);
  const [showUpdateTask, setShowUpdateTask] = useState(false);

  const selectedTask = useRef<TaskDTO | undefined>(undefined);

  useEffect(() => {
    loadEvents();
  }, [mode]);

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
          />

          {/* Caso -> dia */}
          {mode === 'day' && (
            <div className='flex flex-col'>
              {events.map((event: TaskDTO) => {
                return (
                  <DailyTaskCard
                    key={event.id}
                    task={event}
                    onDelete={handleDelete}
                    onEdit={() => {
                      selectedTask.current = event;
                      setShowUpdateTask(true);
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Caso -> mes */}
          {mode === 'month' && (
            <MonthView
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
