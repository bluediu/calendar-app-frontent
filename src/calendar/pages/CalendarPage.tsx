import { localizer, getMessagesES } from '../../helpers';

/* Components */
import { Navbar, CalendarEvent } from '../';

/* Calendar Components */
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export const CalendarPage = () => {
  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        /* 
        events={ events }
        defaultView={ lastView }
        */
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={getMessagesES()}
        /* 
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
         */
      />
    </>
  );
};
