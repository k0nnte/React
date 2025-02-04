import React from 'react';
import { ICard } from '../../other/interfases';
import './card.css';

const Card: React.FC<ICard> = (props) => {
  return (
    <div className="card">
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
