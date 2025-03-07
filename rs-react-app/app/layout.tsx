'use client';
import { ThemeProvider } from '@/src/other/context/theme';
import { store } from '@/src/redux/store';
import React from 'react';
import { Provider } from 'react-redux';
import ErrorBoundary from '@/src/other/Error/ErrorBoundary';
import './global.css';
import App from '@/src/App';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ErrorBoundary>
          <ThemeProvider>
            <Provider store={store}>
              <App>{children}</App>
            </Provider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
};

export default RootLayout;
