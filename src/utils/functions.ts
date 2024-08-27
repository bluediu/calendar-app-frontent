/* Libs */
import Swal from 'sweetalert2';
import { AxiosResponse } from 'axios';
import { parseISO } from 'date-fns';

/* Interfaces */
import { IEvent } from '../apps/Calendar/interfaces';

interface ISessionTokenResponse {
  headers: {
    Authorization: string;
  };
}

export const showError = (resp: AxiosResponse): void => {
  Swal.fire('Error', resp!.data.error, 'error');
};

export const convertEventTimesToDates = (events: IEvent[]): IEvent[] => {
  return events.map((event) => ({
    ...event,
    start: parseISO(event.start.toString()),
    end: parseISO(event.end.toString()),
  }));
};

/**
 * Return a HTTP header authorization token.
 */
export const getSessionToken = (): ISessionTokenResponse => {
  return {
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem('x-token') ?? 'INVALID_TOKEN'
      }`,
    },
  };
};
