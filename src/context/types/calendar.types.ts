import {
  IActiveEvent,
  IEvent,
} from '../../interfaces/eventsResponse';

export interface ICalendarState {
  isLoadingEvents: boolean;
  events: IEvent[];
  activeEvent: null | IActiveEvent;
}
