import React from 'react';
import style from './App.module.css';
import Top from './top/top';
import { useTheme } from './other/context/useTheme';

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <main className={theme === 'white' ? style.main : `${style.main} black`}>
      <div className={style.app}>
        <div className={style.top}>
          <Top />
        </div>
        <div className={style.bottom}>{children}</div>
      </div>
    </main>
  );
};

export default App;
