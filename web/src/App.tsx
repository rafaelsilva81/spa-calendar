import React from 'react';
import dayjs from 'dayjs';
import ptbr from 'dayjs/locale/pt-br';
import { Calendar } from './pages/Calendar';
import ptBR from 'date-fns/locale/pt-BR';
import { registerLocale, setDefaultLocale } from 'react-datepicker';

function App() {
  dayjs.locale(ptbr);
  registerLocale('pt-BR', ptBR);
  setDefaultLocale('pt-BR');

  return (
    <div>
      <Calendar />
    </div>
  );
}

export default App;
