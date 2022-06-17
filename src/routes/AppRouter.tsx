import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

/* Components */
import { AuthPage } from '../auth';
import { CalendarPage } from '../calendar';
import { startRenewToken } from '../context/auth/auth.actions';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { MainLoader } from '../utils/main-loader/MainLoader';

export const AppRouter = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startRenewToken());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'checking') {
    return <MainLoader />;
  }

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/*" element={<Navigate to="/auth" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
