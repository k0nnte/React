import { Iform } from '../other/interfase';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

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
export const formOne = (state: RootState) => state.form1;
export default formSlice.reducer;
