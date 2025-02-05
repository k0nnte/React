import React from 'react';
import { ICard } from '../../other/interfases';
import './card.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Card: React.FC<ICard> = (props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const details = searchParams.get('details');
  const click = () => {
    if (details) {
      searchParams.delete('details');
    } else {
      if (props.id !== undefined) {
        searchParams.set('details', props.id.toString());
      }
    }
    navigate(`/?${searchParams.toString()}`);
  };
  return (
    <div className="card" onClick={click}>
      <p className="item">{props.name}</p>
      <div className="description">
        <p>Height: {props.height}</p>
        <p>Mass: {props.mass}</p>
        <p>Hair color: {props.hair_color}</p>
        <p>Skin color: {props.skin_color}</p>
      </div>
    </div>
  );
};

export default Card;
