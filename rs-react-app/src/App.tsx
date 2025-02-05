import React from 'react';
import './App.css';
import Top from './top/top';
import Response from './bottom/response';
import useLocalStorage from './other/localhook';
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import NotFound from './other/404/404';
import Details from './bottom/details/details';

const App: React.FC = () => {
  const [data, setData] = useLocalStorage('search', '');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const updateData = (newData: string) => {
    if (newData === data) {
      return;
    }
    searchParams.delete('details');
    navigate(`/?${searchParams.toString()}`);
    setData(newData);
  };

  const details = searchParams.get('details');

  return (
    <div className="main">
      <div className="app">
        <div className="top">
          <Top search={data} onSearch={updateData} />
        </div>
        <div className="bottom">
          <Routes>
            <Route path="/" element={<Response search={data} />}>
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
