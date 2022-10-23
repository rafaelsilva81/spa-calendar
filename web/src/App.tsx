import React, { useState } from 'react';
import { Calendar } from './pages/Calendar';
import { Navbar } from './components/Navbar';
import * as dayjs from 'dayjs';
import ptbr from 'dayjs/locale/pt-br';

function App() {
  dayjs.locale(ptbr);

  return (
    <div>
      <Calendar />
    </div>
  );
}

export default App;
