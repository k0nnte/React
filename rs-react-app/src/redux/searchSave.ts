import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseProps } from '../other/interfases';

const initialState: ResponseProps = {
  search: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
