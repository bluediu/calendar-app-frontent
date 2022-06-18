import Swal from 'sweetalert2';
import { AppThunk } from '..';
import { calendarApi } from '../../api';
import { convertEventsToDateEvents } from '../../helpers';
import {
  IEventsResponse,
  IEventResponse,
} from '../../interfaces';
import { IAuthUser } from '../types/auth.types';

import { onLoadEvents, onAddNewEvent } from './calendar.slice';

/* == GET == */
export const startLoadingEvents = (): AppThunk => {
  return async (dispath) => {
    try {
      const { data } = await calendarApi.get<IEventsResponse>(
        '/events'
      );

      const events = convertEventsToDateEvents(data.events);

      dispath(onLoadEvents(events));
    } catch (error) {
      console.log('Error cargando eventos');
      console.error(error);
    }
  };
};

/* == POST == */

interface IAddNewProps {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  id?: string;
}

export const startSavingEvent = (
  calendarEvent: IAddNewProps
): AppThunk => {
  return async (dispatch, getState) => {
    const user = getState().auth.user as IAuthUser;

    /* My current user id */
    const { _id } = user;

    try {
      /* if (calendarEvent.id) {
        // Actualizando
        await calendarApi.put(
          `/events/${calendarEvent.id}`,
          calendarEvent
        );
        dispatch(onAddNewEvent({ ...calendarEvent, user }));
        return;
      } */

      // Create new event & save in database
      const newEventData = { ...calendarEvent, user: _id };

      const { data } = await calendarApi.post<IEventResponse>(
        '/events/create',
        newEventData
      );

      return dispatch(
        onAddNewEvent({
          ...calendarEvent,
          id: data.event.id,
          user,
        })
      );
    } catch (error) {
      console.error(error);
      Swal.fire(
        'Error al guardar',
        'Upps!, Algo salio',
        'error'
      );
    }
  };
};
