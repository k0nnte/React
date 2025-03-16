import { Iform } from '../other/interfase';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export const formSlice = createSlice({
  name: 'form2',
  initialState: {} as Partial<Iform>,
  reducers: {
    updateFormtwo(state, action: PayloadAction<Partial<Iform>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { updateFormtwo } = formSlice.actions;
export const formTwo = (state: RootState) => state.form2;
export default formSlice.reducer;
