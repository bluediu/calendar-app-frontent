import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';

/* Reducers */
import { authSlice } from './index';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
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
