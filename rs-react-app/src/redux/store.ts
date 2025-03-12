import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formOne';

export const store = configureStore({
  reducer: {
    form1: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
