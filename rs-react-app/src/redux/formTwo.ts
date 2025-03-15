import { Iform } from '../other/interfase';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
export default formSlice.reducer;
