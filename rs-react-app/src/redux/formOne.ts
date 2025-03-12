import { Iform } from '../other/interfase';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Iform = {
  name: null,
  age: null,
  email: null,
  password1: null,
  password2: null,
  gender: null,
  image: null,
};

export const formSlice = createSlice({
  name: 'form1',

  initialState,
  reducers: {
    updateForm(state, action: PayloadAction<Partial<Iform>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { updateForm } = formSlice.actions;
export default formSlice.reducer;
