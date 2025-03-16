import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
const initialState: string[] = [
  'Россия',
  'США',
  'Канада',
  'Германия',
  'Франция',
  'Италия',
  'Испания',
  'Китай',
  'Япония',
  'Бразилия',
];

export const formSlice = createSlice({
  name: 'coutry',
  initialState,
  reducers: {},
});
export const selectCountries = (state: RootState) => state.country;
export default formSlice.reducer;
