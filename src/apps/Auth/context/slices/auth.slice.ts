/* Redux */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Types */
import { IAuthState, IAuthUser } from '../../types';

const initialState: IAuthState = {
  isPending: false,
  status: 'checking',
  user: {},
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state: IAuthState) => {
      state.isPending = true;
      state.status = 'checking';
      state.user = {};
    },
    onLogin: (state: IAuthState, action: PayloadAction<IAuthUser>) => {
      state.status = 'authenticated';
      state.user = action.payload;
      state.isPending = false;
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
    setPendingStatus: (state, action: PayloadAction<boolean>) => {
      state.isPending = action.payload;
    },
  },
});

export const {
  onChecking,
  onLogin,
  onLogout,
  clearErrorMessage,
  setPendingStatus,
} = authSlice.actions;
