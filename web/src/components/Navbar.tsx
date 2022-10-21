import React, { Dispatch, useState } from "react";
import { FaCalendar, FaSearch, FaPlus } from "react-icons/fa";
import { TaskDTO } from "../dto/Task";
import { NewTask } from "./NewTask";

export const Navbar = (props: { setMode: Dispatch<string> }) => {
  const { setMode } = props;

  const [newTask, setShowNewTask] = useState(false);

  const onNewTask = (task: TaskDTO) => { 
    setShowNewTask(false);
    console.log(task);
  } 

  return (
    <div
      id="navbar"
      className="flex justify-between p-2 h-14 items-center bg-neutral-100"
    >
      <div className="flex ml-4 items-center text-primary-500">
        <FaCalendar size="24" />
        <h1 className="ml-2 text-xl hidden md:block"> MyCalendar </h1>
      </div>

      <div className="flex flex-wrap mx-3">
        <div className="flex w-full wrap items-center">
          <FaSearch className="text-primary-600" />
          <input
            className="ml-2 border-2 px-2 p-1 rounded-md w-full bg-secondary-200"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="flex justify-between mr-4">
        <div className="flex items-center">
          <select
            name="dateViewer"
            id="dateViewer"
            className="ml-2 border-2 h-10 w-20 p-1 rounded-md bg-secondary-200"
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="day">Dia</option>
            <option value="week">Semana</option>
            <option value="month">Mês</option>
          </select>
        </div>

        <div className="flex items-center justify-center">
          <button
            name="newEvent"
            id="newEvent"
            className="ml-2 border-2 h-10 w-6 md:w-20 p-1 rounded-md bg-secondary-200"
            onClick={() => setShowNewTask(true)}
          >
            <div className="flex items-center justify-center">
              <span className="md:mr-1 text-xs">
                <FaPlus />
              </span>
              <span className="text-sm hidden md:block">Novo</span>
            </div>
          </button>

          {
            newTask && <NewTask onCreate={onNewTask} onClose={() => setShowNewTask(false)} />
          }
        </div>
      </div>
    </div>
  );
};
