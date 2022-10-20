import * as dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import React from "react";

export const Calendar = (props: { mode: string }) => {
  const { mode } = props;

  console.log("MODE IS " + mode);

  const hours = Array.from(Array(24).keys()).map((hour) => {
    return dayjs().startOf("day").add(hour, "hour");
  });

  const simulatedEvent = {
    /* Simular um evento enquanto não há conexão com a api */
    _id: "cl9ga0q590000v6rsx9rtr9ay",
    createdAt: { $date: { $numberLong: "1666222775896" } },
    updatedAt: { $date: { $numberLong: "1666222775896" } },
    title: "test",
    description: "test description",
    start: { $date: { $numberLong: "1451606400000" } },
    end: { $date: { $numberLong: "1451606400000" } },
  };

  const events = [simulatedEvent];

  return (
    <div className="m-2">
      {/* Show current day */}
      <div className="flex justify-left">
        <h1 className="text-3xl p-2 mb-1">
          {dayjs().format("dddd, MMMM D, YYYY")}
        </h1>
      </div>

      <div className="flex flex-col flex-wrap">
        {hours.map((hour) => {
          return (
            <div className="max-w-full h-12" key={hour.toString()}>
              {/* Format hour to HH (AM or PM) format */}
              <span className="m-2 block text-sm border-b-2 border-neutral-800 border-opacity-20">
                {hour.format("HH:mm")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
