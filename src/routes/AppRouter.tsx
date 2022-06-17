import { Navigate, Route, Routes } from 'react-router-dom';

/* Components */
import { AuthPage } from '../auth';
import { CalendarPage } from '../calendar';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />

      <Route path="/" element={<CalendarPage />} />
    </Routes>
  );
};
