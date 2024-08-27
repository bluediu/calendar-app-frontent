/* Libs */
import { AxiosError } from 'axios';

/* Redux */
import { Dispatch } from '@reduxjs/toolkit';
import { calendarActions as calendar } from '../slices';

/* Api */
import calendarApi from '../../api/api';

/* Context */
import { AppThunk } from '../../../../context/store';

/* Interfaces */
import { IActiveEvent, IEvent } from '../../interfaces';

/* Types */
import { IAuthUser } from '../../../Auth/types';

/* Utils */
import { fn } from '../../../../utils';

const EVENTS = '/events';

export const startLoadingEvents = (): AppThunk => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await calendarApi.get<IEvent[]>(`${EVENTS}/list`);
      const events: IEvent[] = fn.convertEventTimesToDates(data);

      dispatch(calendar.onLoadingEvents(events));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        fn.showError(err.response!);
      }
    }
  };
};

/**
 * Add or update an event.
 */
export const startActionEvent = (event: Omit<IEvent, 'user'>): AppThunk => {
  return async (dispatch: Dispatch, getState) => {
    const user = getState().auth.user as IAuthUser;
    const { _id } = user;

    try {
      // On update
      if (event.id) {
        await calendarApi.put<IEvent>(`${EVENTS}/update/${event.id}`, event);

        return dispatch(calendar.onUpdateEvent({ ...event, user }));
      }

      // On create
      const newEvent = { ...event, user: _id };
      const { data } = await calendarApi.post<IEvent>(
        `${EVENTS}/create`,
        newEvent
      );

      return dispatch(
        calendar.onAddEvent({
          ...newEvent,
          id: data.id,
          user,
        })
      );
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        fn.showError(err.response!);
      }
    }
  };
};

export const startDeleteEvent = (): AppThunk => {
  return async (dispatch: Dispatch, getState) => {
    const { id } = getState().calendar.activeEvent as IActiveEvent;

    try {
      await calendarApi.delete(`${EVENTS}/delete/${id}`);
      dispatch(calendar.onDeleteEvent());
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        fn.showError(err.response!);
      }
    }
  };
};
