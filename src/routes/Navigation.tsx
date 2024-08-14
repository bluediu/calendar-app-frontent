import { useEffect } from 'react';

/* Context */
import { startRenewToken } from '../apps/Auth/context';

/* Pages */
import { AuthPage } from '../apps/Auth/pages';
import { CalendarPage } from '../apps/Calendar/pages';

/* Hooks */
import { useAppDispatch, useAppSelector } from '../hooks';

/* Components */
import { MainLoader } from '../shared';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export const Navigation = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startRenewToken());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'checking') return <MainLoader />;

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};
