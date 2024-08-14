import { createSlice } from '@reduxjs/toolkit';

interface IUIState {
  isDateModalOpen: boolean;
}

const initialState: IUIState = {
  isDateModalOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onOpenDateModal: (state: IUIState) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state: IUIState) => {
      state.isDateModalOpen = false;
    },
  },
});

export const { onCloseDateModal, onOpenDateModal } = uiSlice.actions;
