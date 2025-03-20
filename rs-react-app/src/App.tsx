import { useEffect, useState } from 'react';
import './App.css';
import request from './request/request';
import Icountry from './interfase/interfase';
import Card from './card/card';

function App() {
  const [country, setcountry] = useState<Icountry[] | null>(null);

  useEffect(() => {
    request().then((resp: Icountry[]) => setcountry(resp));
  });

  return (
    <div className="wrap">
      {country?.map((item) => <Card key={item.name.official} country={item} />)}
    </div>
  );
}
export default App;
