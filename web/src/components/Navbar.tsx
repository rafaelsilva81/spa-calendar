import React, { Dispatch } from "react";
import { FaCalendar, FaSearch, FaPlusCircle } from "react-icons/fa";

export const Navbar = (props: { setMode: Dispatch<string> }) => {
  const { setMode } = props;

  return (
    <div
      id="navbar"
      className="flex justify-between p-2 items-center bg-neutral-100"
    >
      <div className="flex ml-4 items-center text-primary-500">
        <FaCalendar />
        <h1 className="ml-2 text-xl"> MyCalendar </h1>
      </div>

      <div className="flex flex-wrap w-1/2">
        <div className="flex w-full wrap items-center">
          <FaSearch className="text-primary-600" />
          <input
            className="ml-2 border-2 px-2 p-1 rounded-md w-full bg-secondary-200"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="flex justify-between mr-8">
        <div className="flex items-center">
          <select
            name="dateViewer"
            id="dateViewer"
            className="ml-2 border-2 px-2 p-1 rounded-md bg-secondary-200"
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>

        <div className="flex items-center">
          <button
            name="newEvent"
            id="newEvent"
            className="ml-2 border-2 px-2 p-1 rounded-md bg-secondary-200"
          >
            <div className="flex items-center">
              <FaPlusCircle className="mr-1" /> New Event
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
