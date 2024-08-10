/* Libs */
import Swal from 'sweetalert2';
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

export const startLogin = (props: ILogin): AppThunk => {
  return async (dispatch: Dispatch) => {
    dispatch(onChecking());

    try {
      const { data } = await authApi.post<IUser>('/login', props);

      // Save tokens
      localStorage.setItem('x-token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());

      dispatch(onLogin({ _id: data.uid, name: data.name }));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        Swal.fire('Error', err.response!.data.msg, 'error');
        dispatch(onLogout('Invalid credentials'));
      }
    }
  };
};
