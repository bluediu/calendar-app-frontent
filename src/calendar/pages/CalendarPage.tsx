import { useEffect, useState } from 'react';
import { localizer, getMessagesES } from '../../helpers';

/* Components */
import {
  Navbar,
  CalendarEvent,
  AddNew,
  Delete,
  CalendarModal,
} from '../';

/* Calendar Components */
import { Calendar, View } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

/* Redux */
import {
  useAppDispatch,
  useAppSelector,
} from '../../hooks/redux';
import { IEvent } from '../../interfaces';
import { startLoadingEvents } from '../../context/calendar/calendar.action';

const lastViewLS = localStorage.getItem('lastView') as View;

export const CalendarPage = () => {
  const dispatch = useAppDispatch();
  const { events } = useAppSelector((state) => state.calendar);

  const [lastView, setLastView] = useState<View>(
    lastViewLS || 'week'
  );

  /* === UI ACTIONS === */

  /*
   event: IEvent,
    start: Date,
    end: Date,
    isSelected: boolean
  */
  const eventStyleGetter = (
    event: IEvent,
    start: Date,
    end: Date,
    isSelected: boolean
  ) => {
    // const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

    const style = {
      backgroundColor: /* isMyEvent ? '#347CF7' :  */ '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return {
      style,
    };
  };

  const onDoubleClick = (e: any) => {
    // console.log({ doubleClick: event });
    // openDateModal();
  };

  const onSelect = (e: any) => {
    // console.log({ click: event });
    // setActiveEvent( event );
  };

  const onViewChanged = (e: any) => {
    localStorage.setItem('lastView', e);
    setLastView(e);
  };

  useEffect(() => {
    dispatch(startLoadingEvents());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={getMessagesES()}
        components={{
          event: CalendarEvent,
        }}
        eventPropGetter={(event, start, end, isSelected) =>
          eventStyleGetter(event, start, end, isSelected)
        }
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <AddNew />
      <Delete />
    </>
  );
};
