import React from 'react';
import dayjs from 'dayjs';
import ptbr from 'dayjs/locale/pt-br';
import { Calendar } from './pages/Calendar';

function App() {
  dayjs.locale(ptbr);

  return (
    <div>
      <Calendar />
    </div>
  );
}

export default App;
