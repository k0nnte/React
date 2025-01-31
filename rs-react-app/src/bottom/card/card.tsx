import React from 'react';
import { ICard } from '../../other/interfases';
import './card.css';

class Card extends React.Component<ICard> {
  render(): React.ReactNode {
    return (
      <div className="card">
        <p className="item">{this.props.name}</p>
        <div className="description">
          <p>Height: {this.props.height}</p>
          <p>Mass: {this.props.mass}</p>
          <p>Hair color: {this.props.hair_color}</p>
          <p>Skin color: {this.props.skin_color}</p>
        </div>
      </div>
    );
  }
}

export default Card;
