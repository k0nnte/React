import { useCallback, useEffect, useMemo, useState } from 'react';
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

  const filteredCountre = useMemo(() => {
    return country?.filter((item) => (sel ? item.region === sel : true)) || [];
  }, [country, sel]);

  const searchedCountre = useMemo(() => {
    return filteredCountre.filter((item) =>
      item.name.official.toLowerCase().includes(search.toLowerCase())
    );
  }, [filteredCountre, search]);

  const sortedCountre = useMemo(() => {
    return [...searchedCountre].sort((a, b) => {
      if (order === 'down') {
        return (a.population || 0) - (b.population || 0);
      } else {
        return (b.population || 0) - (a.population || 0);
      }
    });
  }, [searchedCountre, order]);

  useEffect(() => {
    request().then((resp: Icountry[]) => setcountry(resp));
  }, []);

  const handleSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setsel(event.target.value);
    },
    []
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setsearch(event.target.value);
    },
    []
  );

  const handleSortOrder = useCallback((order: 'up' | 'down') => {
    setorder(order);
  }, []);

  return (
    <>
      <div className="header">
        <select onChange={(event) => handleSelectChange(event)} value={sel}>
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
          onChange={(event) => handleSearchChange(event)}
        />
        <div className="wwrap_sort">
          <p>sort by population</p>
          <button onClick={() => handleSortOrder('down')}>low</button>
          <button onClick={() => handleSortOrder('up')}>up</button>
        </div>
      </div>

      <div className="wrap">
        {sortedCountre?.map((item) => (
          <Card key={item.name.official} country={item} />
        ))}
      </div>
    </>
  );
}
export default App;
