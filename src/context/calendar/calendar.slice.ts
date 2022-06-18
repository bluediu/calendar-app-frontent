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
    onSetActiveEvent: (
      state,
      { payload }: PayloadAction<IActiveEvent>
    ) => {
      state.activeEvent = payload;
    },
  },
});

export const { onLoadEvents, onSetActiveEvent } =
  calendarSlice.actions;
