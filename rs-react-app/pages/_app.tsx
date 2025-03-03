import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import ErrorBoundary from '@/src/other/Error/ErrorBoundary';
import { ThemeProvider } from '@/src/other/context/theme';
import './global.css';
import App from '../src/App';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Provider store={store}>
          <App>
            <Component {...pageProps} />
          </App>
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
