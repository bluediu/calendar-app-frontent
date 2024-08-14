/* Libs */
import Swal from 'sweetalert2';
import { AxiosResponse } from 'axios';
import { parseISO } from 'date-fns';

/* Interfaces */
import { IEvent } from '../apps/Calendar/interfaces';

export const showError = (resp: AxiosResponse): void => {
  Swal.fire('Error', resp!.data.msg, 'error');
};

export const convertEventTimesToDates = (events: IEvent[]): IEvent[] => {
  return events.map((event) => ({
    ...event,
    start: parseISO(event.start.toString()),
    end: parseISO(event.end.toString()),
  }));
};
