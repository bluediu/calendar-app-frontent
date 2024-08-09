import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

/* Pages */
import { AuthPage } from '../apps/Auth/pages';

export const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};
