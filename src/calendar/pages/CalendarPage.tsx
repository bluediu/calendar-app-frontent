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
import { startLoadingEvents } from '../../context/calendar/calendar.action';
import {
  onOpenDateModal,
  onSetActiveEvent,
} from '../../context';
import { IEvent } from '../../interfaces';
import { IAuthUser } from '../../context/types/auth.types';

const lastViewLS = localStorage.getItem('lastView') as View;

export const CalendarPage = () => {
  const dispatch = useAppDispatch();

  /* Get data from store */
  const { events } = useAppSelector((state) => state.calendar);
  const user = useAppSelector(
    (state) => state.auth.user
  ) as IAuthUser;

  const [lastView, setLastView] = useState<View>(
    lastViewLS || 'week'
  );

  /* === UI ACTIONS === */

  /* Set events colors  */
  const eventStyleGetter = (
    event: IEvent,
    start: Date,
    end: Date,
    isSelected: boolean
  ) => {
    const isMyEvent =
      user?._id === event.user?._id ||
      user?._id === event.user?._id;

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

  /* Calendar events */
  const onDoubleClick = (_e: IEvent) => {
    dispatch(onOpenDateModal());
  };

  const onSelect = (e: IEvent) => {
    dispatch(onSetActiveEvent(e));
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
