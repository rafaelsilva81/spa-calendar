import React, { useEffect, useState } from "react";
import * as dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { DailyCalendar } from "../components/DailyCalendar";
import { TaskDTO } from "../dto/Task";
import api from "../services/api";

export const Calendar = (props: { mode: string }) => {
  const { mode } = props;
  const [events, setEvents] = useState<TaskDTO[]>([]);

  useEffect(() => {
    if (mode === "day") {
      const ref = dayjs().startOf("day");
      api
        .get(`/sort/day/${ref.toISOString()}/`)
        .then(({data}: {data: TaskDTO[]}) => {
          setEvents(data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, [mode]);

  return (
    <div id="calendar" className="px-4 pt-4 h-full max-h-full">
      {mode === "day" && <DailyCalendar events={events} />}
      {mode === "week" && <span>todo </span>}
      {mode === "month" && <span>todo </span>}
    </div>
  );
};
