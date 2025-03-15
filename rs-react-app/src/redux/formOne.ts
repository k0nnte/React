import { Iform } from '../other/interfase';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form1',
  initialState: {} as Partial<Iform>,
  reducers: {
    updateForm(state, action: PayloadAction<Partial<Iform>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { updateForm } = formSlice.actions;
export default formSlice.reducer;
