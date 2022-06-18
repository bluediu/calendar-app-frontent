import { AppThunk } from '..';
import { calendarApi } from '../../api';
import { convertEventsToDateEvents } from '../../helpers';
import { IEventResponse } from '../../interfaces';

import { onLoadEvents } from './calendar.slice';

export const startLoadingEvents = (): AppThunk => {
  return async (dispath) => {
    try {
      const { data } = await calendarApi.get<IEventResponse>(
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
