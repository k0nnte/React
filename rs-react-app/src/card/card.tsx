import React from 'react';
import Icountry from '../interfase/interfase';
import './card.css';

const Card: React.FC<{
  country: Icountry;
  visit: boolean;
  tVisit: (item: string) => void;
}> = ({ country, visit, tVisit }) => {
  return (
    <div
      className={`wrapper_card ${visit ? 'visited' : ''}`}
      onClick={() => tVisit(country.name.official)}
    >
      <h3>Country name: {country.name.common}</h3>
      <p>population {country.population}</p>
      <p>Region: {country.region}</p>
      <img src={country.flags.png} alt="flag" />
    </div>
  );
};

export default React.memo(Card);
