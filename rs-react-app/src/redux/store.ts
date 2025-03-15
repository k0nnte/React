import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formOne';
import countryReducer from './coutry';

export const store = configureStore({
  reducer: {
    form1: formReducer,
    country: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
