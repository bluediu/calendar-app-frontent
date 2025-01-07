/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';

/* Context */
import { calendarActions, startLoadingEvents, uiActions } from '../context';

/* Components */
import { CalendarModal } from '../components/ui';
import { Calendar, View } from 'react-big-calendar';

import {
  AddEvent,
  RemoveEvent,
  Navbar,
  Event as CalendarEvent,
} from '../components';

/* Hooks */
import { useAppDispatch, useAppSelector } from '../../../hooks';

/* Interfaces */
import { IEvent } from '../interfaces';

/* Helpers */
import { localizer } from '../helpers';

const lastViewLS = localStorage.getItem('lastViewLS') as View;

export const CalendarPage = () => {
  const dispatch = useAppDispatch();

  const { events } = useAppSelector((state) => state.calendar);
  const user = useAppSelector((state) => state.auth.user);

  const [lastView, setLastView] = useState<View>(lastViewLS || 'week');

  useEffect(() => {
    dispatch(startLoadingEvents());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Set event colors  */
  const eventStyleGetter = (event: IEvent) => {
    const isMyEvent: boolean = user?._id === event.user?._id;

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
  const onDoubleClick = () => {
    dispatch(uiActions.onOpenDateModal());
  };

  const onSelect = (e: IEvent) => {
    dispatch(calendarActions.onSetActiveEvent(e));
  };

  const onViewChange = (e: View) => {
    localStorage.setItem('lastViewLS', e);
    setLastView(e);
  };

  return (
    <>
      <Navbar />

      {/* @ts-ignore */}
      <Calendar
        culture="English"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        components={{ event: CalendarEvent }}
        eventPropGetter={(event: IEvent) => eventStyleGetter(event)}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <CalendarModal />
      <AddEvent />
      <RemoveEvent />
    </>
  );
};
