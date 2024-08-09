import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { authSlice } from '../apps/Auth/context';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    // ui: uiSlice.reducer,
    // calendar: calendarSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
