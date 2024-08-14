/* Interfaces */
import { IActiveEvent, IEvent } from '../interfaces';

export interface ICalendarState {
  isLoading: boolean;
  events: IEvent[];
  activeEvent: null | IActiveEvent;
}
