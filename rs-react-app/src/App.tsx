import React from 'react';
import './App.css';
import Top from './top/top';
import Response from './bottom/response';
import useLocalStorage from './other/localhook';

const App: React.FC = () => {
  const [data, setData] = useLocalStorage('search', '');

  const updateData = (newData: string) => {
    if (newData === data) {
      return;
    }
    setData(newData);
  };
  return (
    <div className="main">
      <div className="app">
        <div className="top">
          <Top search={data} onSearch={updateData} />
        </div>
        <div className="bottom">
          <Response search={data} />
        </div>
      </div>
    </div>
  );
};

export default App;
