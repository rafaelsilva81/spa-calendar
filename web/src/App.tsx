import React, { useState } from "react";
import { Calendar } from "./components/Calendar";
import { Navbar } from "./components/Navbar";
import * as dayjs from "dayjs";
import ptbr from "dayjs/locale/pt-br";

function App() {
  dayjs.locale(ptbr);

  const [mode, setMode] = useState<string>("day");

  return (
    <div>
      <Navbar setMode={setMode} />
      <Calendar mode={mode} />
    </div>
  );
}

export default App;
