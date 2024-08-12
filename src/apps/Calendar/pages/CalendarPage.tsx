import { localizer } from '../helpers';

/* Components */
import { Calendar, Event, View } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
  AddEvent,
  RemoveEvent,
  Navbar,
  Event as CalendarEvent,
} from '../components';
import { IEvent } from '../interfaces';

export const CalendarPage = () => {
  /* Set event colors  */
  const eventStyleGetter = (
    event: IEvent
    // start: Date,
    // end: Date,
    // isSelected: boolean
  ) => {
    const isMyEvent: boolean = true;
    // user?._id === event.user?._id || user?._id === event.user?._id;

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return {
      style,
    };
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture="English"
        localizer={localizer}
        events={[]}
        // defaultView={}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        // messages={getMessagesES()}
        components={{ event: CalendarEvent }}
        eventPropGetter={(event: IEvent) => eventStyleGetter(event)}
      />
      <AddEvent />
      <RemoveEvent />
    </>
  );
};
