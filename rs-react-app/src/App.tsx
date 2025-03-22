import { useEffect, useState } from 'react';
import './App.css';
import request from './request/request';
import Icountry from './interfase/interfase';
import Card from './card/card';

function App() {
  const [country, setcountry] = useState<Icountry[] | null>(null);
  const [sel, setsel] = useState<string>('');
  const [order, setorder] = useState<'up' | 'down'>('up');
  const region = [
    ...new Set(country?.map((item) => item.region).filter(Boolean)),
  ];
  const [search, setsearch] = useState<string>('');
  let filter = country || [];
  if (sel) {
    filter = filter?.filter((item) => item.region === sel);
  }
  if (search) {
    filter = filter?.filter((item) =>
      item.name.official.toLowerCase().includes(search.toLowerCase())
    );
  }

  filter = filter.sort((a, b) => {
    if (order === 'down') {
      return (a.population || 0) - (b.population || 0);
    } else {
      return (b.population || 0) - (a.population || 0);
    }
  });

  useEffect(() => {
    request().then((resp: Icountry[]) => setcountry(resp));
  }, []);

  return (
    <>
      <div className="header">
        <select onChange={(event) => setsel(event.target.value)} value={sel}>
          <option value="">all region</option>
          {region?.map((reg) => (
            <option value={reg} key={reg}>
              {reg}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="search"
          value={search}
          onChange={(event) => setsearch(event.target.value)}
        />
        <div className="wwrap_sort">
          <p>sort by population</p>
          <button onClick={() => setorder('down')}>low</button>
          <button onClick={() => setorder('up')}>up</button>
        </div>
      </div>

      <div className="wrap">
        {filter?.map((item) => (
          <Card key={item.name.official} country={item} />
        ))}
      </div>
    </>
  );
}
export default App;
