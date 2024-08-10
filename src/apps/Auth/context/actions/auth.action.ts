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
import { ILogin, IUser } from '../../interfaces';

/* Utils */
import { fn } from '../../../../utils';

const TOKEN = 'x-token';

const _saveToken = (token: string): void => {
  localStorage.setItem(TOKEN, token);
  localStorage.setItem('token-init-date', new Date().getTime().toString());
};

export const startLogin = (props: ILogin): AppThunk => {
  return async (dispatch: Dispatch) => {
    dispatch(onChecking());
    try {
      const { data } = await authApi.post<IUser>('/login', props);
      _saveToken(data.token);

      dispatch(onLogin({ _id: data.uid, name: data.name }));
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
      const { data } = await authApi.get<IUser>('/renew', {
        headers: { 'x-token': token },
      });
      _saveToken(data.token);

      dispatch(onLogin({ _id: data.uid, name: data.name }));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        fn.showError(err.response!);
        dispatch(onLogout('Invalid credentials'));
      }
    }
  };
};
