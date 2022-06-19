import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IActiveEvent,
  IEvent,
} from '../../interfaces/eventsResponse';
import { ICalendarState } from '../types/calendar.types';

const initialState: ICalendarState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onLoadEvents: (
      state,
      { payload }: PayloadAction<IEvent[]>
    ) => {
      state.isLoadingEvents = false;
      state.events = payload;
    },

    onAddNewEvent: (
      state,
      { payload }: PayloadAction<IEvent>
    ) => {
      state.events.push(payload);
      state.activeEvent = null;
    },

    onUpdateEvent: (
      state,
      { payload }: PayloadAction<IEvent>
    ) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }

        return event;
      });
    },

    onSetActiveEvent: (
      state,
      { payload }: PayloadAction<IActiveEvent>
    ) => {
      state.activeEvent = payload;
    },

    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent?.id
        );
        state.activeEvent = null;
      }
    },

    onCleanActiveEvent: (state) => {
      state.activeEvent = null;
    },

    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});

export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
  onCleanActiveEvent,
} = calendarSlice.actions;
