import React, { useState } from 'react';
import './App.css';
import Top from './top/top';
import Response from './bottom/response';

const App: React.FC = () => {
  const [data, setData] = useState(localStorage.getItem('search') || '');

  const updateData = (newData: string) => {
    const currentData = localStorage.getItem('search');
    if (newData === currentData) {
      return;
    }
    setData(newData);
    localStorage.setItem('search', newData);
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
