import React from 'react';
import './App.css';
import Top from './top/top';
import Response from './bottom/response';
import { useTheme } from './other/context/useTheme';

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <main className={theme === 'white' ? 'main' : 'main black'}>
      <div className="app">
        <div className="top">
          <Top />
        </div>
        <div className="bottom">
          <Response />
          {children}
        </div>
      </div>
    </main>
  );
};

export default App;
