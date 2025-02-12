import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from '../other/interfases';

interface Checked {
  person: Array<ICard>;
}

const initialState: Checked = {
  person: [],
};

const checkSlice = createSlice({
  name: 'check',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ICard>) => {
      if (!state.person.some((person) => person.id === action.payload.id)) {
        state.person.push(action.payload);
      }
    },
    deleteItem: (state, action: PayloadAction<ICard>) => {
      state.person = state.person.filter(
        (pers) => pers.id !== action.payload.id
      );
    },
    destroy: (state) => {
      state.person = [];
    },
  },
});

export const { add, deleteItem, destroy } = checkSlice.actions;
export default checkSlice.reducer;
