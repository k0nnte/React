import { configureStore } from '@reduxjs/toolkit';
import { rfetch } from '../other/rfetch';
import { fetchData } from '../other/fetchData';
import searchSaveReducer from './searchSave';
import checkSaveReducer from './checkSave';

export const store = configureStore({
  reducer: {
    [rfetch.reducerPath]: rfetch.reducer,
    [fetchData.reducerPath]: fetchData.reducer,
    searchSave: searchSaveReducer,
    checkSave: checkSaveReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      rfetch.middleware,
      fetchData.middleware
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
