import React from 'react';
import './App.css';
import Top from './top/top';
import Response from './bottom/response';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import NotFound from './other/404/NotFound';
import Details from './bottom/details/details';
import { useTheme } from './other/context/useTheme';

const App: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { theme } = useTheme();
  const details = searchParams.get('details');

  return (
    <div className={theme === 'white' ? 'main' : 'main black'}>
      <div className="app">
        <div className="top">
          <Top />
        </div>
        <div className="bottom">
          <Routes>
            <Route path="/" element={<Response />}>
              {details && <Route path="/" element={<Details />} />}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
