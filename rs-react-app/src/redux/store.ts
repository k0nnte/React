import { configureStore } from '@reduxjs/toolkit';
import searchSaveReducer from './searchSave';
import checkSaveReducer from './checkSave';

export const store = configureStore({
  reducer: {
    searchSave: searchSaveReducer,
    checkSave: checkSaveReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
