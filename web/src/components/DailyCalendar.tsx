import React, { useEffect } from "react";
import * as dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { TaskDTO } from "../dto/Task";

export const DailyCalendar = (props: { events: TaskDTO[] }) => {
  const { events } = props;

  const hours = Array.from(Array(24).keys()).map((hour) => {
    return dayjs().startOf("day").add(hour, "hour");
  });

  return (
    
    <div>
      <div className="flex flex-col h-full">
        {hours.map((hour) => {
          return (
            <div
              className="h-[80px] flex flex-row items-center w-full"
              key={hour.toString()}
            >
              <span className="mx-2 text-sm">{hour.format("HH:mm")}</span>
              <div className="bg-neutral-300 h-[2px] w-full"></div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col h-full">
        {/* Make a visual grid for the background with rows */}

        {events.map((event, index) => {
          const start = dayjs(event.start);
          const end = dayjs(event.end);
          const duration = end.diff(start, "minute");

          const startInMinutes = start.diff(start.startOf("day"), "minute");

          return (
            <div
              key={event._id}
              className="absolute bg-primary-500 text-white rounded-md p-3 border-neutral-200 border-2 min-h-[60px] ml-2"
              style={{
                top: (startInMinutes * 80) / 60 + 80,
                left: index * 200 + 60,
                /* Dont let events overflow on the viewport */
                width: 300,
                height: (duration * 80) / 60,
              }}
            >
              <span className="m-2 text-sm border-opacity-20">
                {start.format("HH:mm")} - {end.format("HH:mm")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};