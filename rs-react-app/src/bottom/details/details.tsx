import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Irez } from '../../other/interfases';
import load from '../../assets/loadtwo.gif';
import './details.css';

const Details: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const details = searchParams.get('details');
  const [rez, setRez] = useState<Irez | null>(null);

  const fetchData = async (id: string) => {
    const result = await fetch(`https://swapi.dev/api/people/${id}/`);
    const data = await result.json();
    return data;
  };

  const click = () => {
    searchParams.delete('details');
    navigate(`/?${searchParams.toString()}`);
  };

  useEffect(() => {
    if (details) {
      fetchData(details).then((data) => {
        setRez(data);
      });
    }
  }, [details]);

  return (
    <>
      {rez === null ? (
        <img className="loadtwo" src={load} alt="Loading..." />
      ) : (
        <div className="details">
          <p>name {rez?.name}</p>
          <p>birth_year {rez?.birth_year}</p>
          <p>Height: {rez?.height}</p>
          <p>Mass: {rez?.mass}</p>
          <p>Hair color: {rez?.hair_color}</p>
          <p>Skin color: {rez?.skin_color}</p>
          <p>Skin eye: {rez?.eye_color}</p>

          <button className="btn_close" onClick={click}>
            close
          </button>
        </div>
      )}
    </>
  );
};
export default Details;
