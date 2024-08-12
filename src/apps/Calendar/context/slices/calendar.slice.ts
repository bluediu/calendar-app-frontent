/* Redux */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Interfaces */
import { IActiveEvent, IEvent } from '../../interfaces';

/* Types */
import { ICalendarState } from '../../types';

const initialState: ICalendarState = {
  isLoading: true,
  events: [],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onLoadingEvents: (
      state: ICalendarState,
      action: PayloadAction<IEvent[]>
    ) => {
      state.isLoading = true;
      state.events = action.payload;
    },
    onAddEvent: (state: ICalendarState, action: PayloadAction<IEvent>) => {
      state.events.push(action.payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state: ICalendarState, action: PayloadAction<IEvent>) => {
      state.events = state.events.map((event: IEvent) => {
        if (event.id === action.payload.id) return action.payload;

        return event;
      });
    },
    onDeleteEvent: (state: ICalendarState) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event: IEvent) => event.id !== state.activeEvent!.id
        );
        state.activeEvent = null;
      }
    },
    onSetActiveEvent: (
      state: ICalendarState,
      event: PayloadAction<IActiveEvent>
    ) => {
      state.activeEvent = event.payload;
    },
    onCleanActiveEvent: (state: ICalendarState) => {
      state.activeEvent = null;
    },
    onLogoutCalendar: (state: ICalendarState) => {
      state.isLoading = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});

export const {
  onAddEvent,
  onCleanActiveEvent,
  onDeleteEvent,
  onLoadingEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} = calendarSlice.actions;
