import React, { useEffect, useRef, useState } from 'react';
import * as dayjs from 'dayjs';
import { ITaskDTO, TaskDTO } from '../dto/Task';
import api from '../services/api';
import { Navbar, CalendarHeader, DailyTaskCard } from '../components/common';
import { EditTaskModal, NewTaskModal } from '../components/modals';
import { DailyCalendar, WeeklyCalendar, MonthlyCalendar } from '../components/calendars';

export const Calendar = () => {
  const [mode, setMode] = useState<'day' | 'week' | 'month'>('day');

  const [events, setEvents] = useState<TaskDTO[]>([]);

  const [selectedDate, setSelectedDate] = useState(dayjs().startOf(mode));

  const [showNewTask, setShowNewTask] = useState(false);
  const [showUpdateTask, setShowUpdateTask] = useState(false);

  const selectedTask = useRef<TaskDTO | undefined>(undefined);

  const [search, setSearch] = useState<string | undefined>();

  console.log('Selected  date: ' + selectedDate.format('DD/MM/YYYY'));

  useEffect(() => {
    if (search) {
      loadEvents(search);
    } else {
      loadEvents();
    }
  }, [mode, selectedDate, search]);

  const loadEvents = async (search?: string) => {
    if (search) {
      api
        .get(`/title/${search}`)
        .then(({ data }: { data: TaskDTO[] }) => {
          setEvents(data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      api
        .get(`/sort/${mode}/${selectedDate}/`)
        .then(({ data }: { data: TaskDTO[] }) => {
          setEvents(data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
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
        setSearch={setSearch}
        search={search}
      />

      <div
        id='calendar'
        className='p-4 md:p-8 mx-1 md:mx-14'>
        <div className='flex flex-col'>
          {search ? (
            events.length === 0 ? (
              <div className='flex flex-col items-center'>
                <h1 className='text-xl text-center font-semibold my-4'>
                  Nenhuma tarefa encontrada!
                </h1>
                <button
                  className='bg-primary-600 hover:bg-primary-500 active:bg-primary-500 text-white font-bold py-2 px-4 rounded'
                  onClick={() => setSearch(undefined)}>
                  Limpar pesquisa
                </button>
              </div>
            ) : (
              <div className='flex flex-col'>
                <div className='flex justify-between mb-2 items-center'>
                  <h1 className='text-center md:text-xl text-lg font-bold'>Tarefas encontradas</h1>
                  <button
                    className='bg-primary-600 hover:bg-primary-500 active:bg-primary-500 text-white font-bold py-1 px-2 rounded'
                    onClick={() => setSearch(undefined)}>
                    <span className='hidden md:flex'>Limpar pesquisa</span>
                    <span className='flex md:hidden text-sm'>Limpar</span>
                  </button>
                </div>
                <div className='flex flex-col'>
                  {events.map((event) => (
                    <DailyTaskCard
                      key={event.id}
                      task={event}
                      onDelete={handleDelete}
                      onEdit={() => {
                        setShowUpdateTask(true);
                        selectedTask.current = event;
                      }}
                    />
                  ))}
                </div>
              </div>
            )
          ) : (
            <>
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
            </>
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
