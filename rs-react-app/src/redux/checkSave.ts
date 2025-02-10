import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Checked {
  id: Array<number>;
}

const initialState: Checked = {
  id: [],
};

const checkSlice = createSlice({
  name: 'check',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      if (!state.id.includes(action.payload)) {
        state.id.push(action.payload);
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.id = state.id.filter((id) => id !== action.payload);
    },
    destroy: (state) => {
      state.id = [];
    },
  },
});

export const { add, deleteItem, destroy } = checkSlice.actions;
export default checkSlice.reducer;
