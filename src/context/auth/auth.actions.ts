import { AppThunk } from '../store';

import { authApi } from '../../api';

import { IUserResponse } from '../../interfaces';

import {
  onChecking,
  onLogin,
  onLogout,
  clearErrorMessage,
} from './auth.slice';

/* Interfaces */
interface ILogInProps {
  email: string;
  password: string;
}

interface IRegisterProps extends ILogInProps {
  name: string;
}

/* Log In */
export const startLogin = ({
  email,
  password,
}: ILogInProps): AppThunk => {
  return async (dispatch) => {
    dispatch(onChecking());

    try {
      const { data } = await authApi.post<IUserResponse>(
        '/auth/login',
        {
          email,
          password,
        }
      );

      localStorage.setItem('token', data.token);

      localStorage.setItem(
        'token-init-date',
        String(new Date().getTime())
      );
      console.log(data);

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout('Invalid credentials'));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };
};

export const startRegister = ({
  email,
  password,
  name,
}: IRegisterProps): AppThunk => {
  return async (dispatch) => {
    dispatch(onChecking());
    try {
      const { data } = await authApi.post('/auth/signin', {
        email,
        password,
        name,
      });

      localStorage.setItem('token', data.token);

      localStorage.setItem(
        'token-init-date',
        String(new Date().getTime())
      );

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(
        onLogout('The register failed, please try later')
      );
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };
};
