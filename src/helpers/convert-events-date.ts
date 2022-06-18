import { parseISO } from 'date-fns';
import { IEvent } from '../interfaces';

/**
 * This function takes an array of events and returns an array of events with the start and end
 * properties converted to Date objects.
 * @param {IEvent[]} events - IEvent[]
 * @returns An array of events with the start and end properties converted to strings.
 */
export const convertEventsToDateEvents = (
  events: IEvent[]
): IEvent[] => {
  return events.map((event) => {
    event.end = parseISO(event.start.toString());
    event.start = parseISO(event.start.toString());

    return event;
  });
};
