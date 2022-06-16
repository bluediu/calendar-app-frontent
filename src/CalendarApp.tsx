import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes';

function CalendarApp() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default CalendarApp;
