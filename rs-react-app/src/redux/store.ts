import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formOne';
import formReduceer from './formTwo';
import countryReducer from './coutry';

export const store = configureStore({
  reducer: {
    form1: formReducer,
    country: countryReducer,
    form2: formReduceer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
