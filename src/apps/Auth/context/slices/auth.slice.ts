/* Redux */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Types */
import { IAuthState, IAuthUser } from '../../types';

const initialState: IAuthState = {
  status: 'checking',
  user: {},
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state: IAuthState) => {
      state.status = 'checking';
      state.user = {};
    },
    onLogin: (state: IAuthState, action: PayloadAction<IAuthUser>) => {
      state.status = 'authenticated';
      state.user = action.payload;
    },
    onLogout: (
      state: IAuthState,
      action: PayloadAction<string | undefined>
    ) => {
      state.status = 'not-authenticated';
      state.user = {};
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions;
