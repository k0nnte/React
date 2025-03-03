import React from 'react';
import Loyaut from '@/src/loyaut/loyaut';
import Details from '@/src/details/datails';
import ErrorBoundary from '@/src/other/Error/ErrorBoundary';
import { ThemeProvider } from '@/src/other/context/theme';
import { Provider } from 'react-redux';
import { store } from '@/src/redux/store';

const Main = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Provider store={store}>
          <Loyaut>
            <Details />
          </Loyaut>
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default Main;
