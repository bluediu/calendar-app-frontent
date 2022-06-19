import Swal from 'sweetalert2';
import { AppThunk } from '..';
import { calendarApi } from '../../api';
import { convertEventsToDateEvents } from '../../helpers';
import {
  IEventsResponse,
  IEventResponse,
  IActiveEvent,
} from '../../interfaces';
import { IAuthUser } from '../types/auth.types';

import {
  onLoadEvents,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
} from './calendar.slice';

/* == GET == */
export const startLoadingEvents = (): AppThunk => {
  return async (dispath) => {
    try {
      const { data } = await calendarApi.get<IEventsResponse>(
        '/events'
      );

      const events = convertEventsToDateEvents(data.events);
      console.log('EVENTOS', events);
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
      /* If the event has an Id it is a event created, therefore it is needed update */
      if (calendarEvent.id) {
        // Updating
        await calendarApi.put(
          `/events/${calendarEvent.id}`,
          calendarEvent
        );

        return dispatch(
          onUpdateEvent({ ...calendarEvent, user })
        );
      }

      console.log('CREANDO');

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
        'Upps!, Algo salio o no tienes permiso para modificar estos datos',
        'error'
      );
    }
  };
};

export const startDeletingEvent = (): AppThunk => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar
      .activeEvent as IActiveEvent;

    try {
      await calendarApi.delete(`/events/${id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire(
        'Error al eliminar',
        'No se pudo borrar el evento',
        'error'
      );
    }
  };
};

// BORRAR Y ACTUALIZAR
/* API: {{url}}/api/events/62aa8f8fa60118e51c051798 */
