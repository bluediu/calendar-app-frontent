/* Libs */
import { AxiosError } from 'axios';

/* Redux */
import { Dispatch } from '@reduxjs/toolkit';
import { onChecking, onLogin, onLogout } from '../slices';

/* Context */
import { AppThunk } from '../../../../context/store';

/* Api */
import { authApi } from '../../api';

/* Interfaces */
import {
  ILogin,
  IRegister,
  IAuthResponse,
  IRenewResponse,
} from '../../interfaces';

/* Utils */
import { fn } from '../../../../utils';

const TOKEN = 'x-token';
const TOKEN_INIT = 'x-token-init-date';

const _saveToken = (token: string): void => {
  localStorage.setItem(TOKEN, token);
  localStorage.setItem(TOKEN_INIT, new Date().getTime().toString());
};

export const startLogin = (props: ILogin): AppThunk => {
  return async (dispatch: Dispatch) => {
    dispatch(onChecking());
    try {
      const { data } = await authApi.post<IAuthResponse>('/login', props);
      _saveToken(data.token);

      const { id: _id, name } = data.user!;
      dispatch(onLogin({ _id, name }));
    } catch (err: unknown) {
      console.log(err);

      if (err instanceof AxiosError) {
        fn.showError(err.response!);
        dispatch(onLogout('Invalid credentials'));
      }
    }
  };
};

export const startSignIn = (props: IRegister) => {
  return async (dispatch: Dispatch) => {
    dispatch(onChecking());
    try {
      const { data } = await authApi.post<IAuthResponse>('/sign-in', props);
      _saveToken(data.token);

      const { id: _id, name } = data.user!;
      dispatch(onLogin({ _id, name }));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        fn.showError(err.response!);
        dispatch(onLogout('Invalid credentials'));
      }
    }
  };
};

export const startRenewToken = () => {
  return async (dispatch: Dispatch) => {
    const token = localStorage.getItem(TOKEN);

    if (!token) return dispatch(onLogout());

    try {
      const { data } = await authApi.get<IRenewResponse>(
        '/renew-token',
        fn.getSessionToken()
      );
      _saveToken(data.token);

      dispatch(onLogin({ _id: data.id, name: data.name }));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        fn.showError(err.response!);
        dispatch(onLogout('Invalid credentials'));
      }
    }
  };
};

export const startLogout = (): AppThunk => {
  return (dispatch: Dispatch) => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(TOKEN_INIT);
    dispatch(onLogout());
  };
};
