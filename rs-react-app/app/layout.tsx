'use client';
import { ThemeProvider } from '@/src/other/context/theme';
// import ErrorBoundary from '@/src/other/Error/ErrorBoundary';
import { store } from '@/src/redux/store';
import Top from '@/src/top/top';
import React from 'react';
import { Provider } from 'react-redux';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ThemeProvider>
          <Provider store={store}>
            <main className="main">
              <div className="app">
                <div className="top">
                  <Top />
                </div>
                {children}
              </div>
            </main>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
