import { AppThunk } from '../store';

import { authApi } from '../../api';

import { IUserResponse } from '../../interfaces';

import {
  onChecking,
  onLogin,
  onLogout,
  clearErrorMessage,
} from './auth.slice';
import { onLogoutCalendar } from '../calendar/calendar.slice';
import Swal from 'sweetalert2';

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

      dispatch(onLogin({ name: data.name, _id: data.uid }));
    } catch (error) {
      Swal.fire(
        'Error al iniciar sección',
        'Correo o contraseña incorrectos',
        'error'
      );
      dispatch(onLogout('Invalid credentials'));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };
};

/* Register user */
export const startRegister = ({
  email,
  password,
  name,
}: IRegisterProps): AppThunk => {
  return async (dispatch) => {
    dispatch(onChecking());
    try {
      const { data } = await authApi.post<IUserResponse>(
        '/auth/signin',
        {
          email,
          password,
          name,
        }
      );

      localStorage.setItem('token', data.token);

      localStorage.setItem(
        'token-init-date',
        String(new Date().getTime())
      );

      dispatch(onLogin({ name: data.name, _id: data.uid }));
    } catch (error) {
      Swal.fire(
        'No se pudo crear la cuenta',
        'Por favor hable con el admistrador o intentelo más tarde',
        'error'
      );
      dispatch(
        onLogout('The register failed, please try later')
      );
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };
};

// Renew Token
export const startRenewToken = (): AppThunk => {
  return async (dispatch) => {
    // Get current token
    const token = localStorage.getItem('token');

    // No user authenticated
    if (!token) return dispatch(onLogout(undefined));

    try {
      // Renew token from api
      const { data } = await authApi.get<IUserResponse>(
        'auth/renew',
        {
          headers: {
            'x-token': token,
          },
        }
      );

      // save new token
      localStorage.setItem('token', data.token);

      localStorage.setItem(
        'token-init-date',
        String(new Date().getTime())
      );

      dispatch(onLogin({ name: data.name, _id: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout(undefined));
    }
  };
};

// Log Out
export const startLogout = (): AppThunk => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };
};
