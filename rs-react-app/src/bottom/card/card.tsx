'use client';
import React from 'react';
import { ICard } from '../../other/interfases';
import './card.css';
import { useDispatch, useSelector } from 'react-redux';
import { add, deleteItem } from '../../redux/checkSave';
import { RootState } from '../../redux/store';
import { useTheme } from '../../other/context/useTheme';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

const Card: React.FC<ICard> = (props) => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const checkId = useSelector((state: RootState) => state.checkSave.person);
  const { theme } = useTheme();
  const { id } = useParams();
  const click = () => {
    if (props.id !== undefined && id === undefined) {
      navigate.push(`/${props.id}/?${searchParams}`);
    } else {
      navigate.push(`/?${searchParams}`);
    }
  };

  const clickCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      dispatch(add(props));
    } else {
      dispatch(deleteItem(props));
    }
  };
  return (
    <div
      data-testid="card_test"
      className={theme === 'white' ? 'card' : 'card black'}
      onClick={click}
    >
      <p className="item">{props.name}</p>
      <div className="description">
        <p>Height: {props.height}</p>
        <p>Mass: {props.mass}</p>
        <p>Hair color: {props.hair_color}</p>
        <p>Skin color: {props.skin_color}</p>
      </div>
      <input
        type="checkbox"
        onClick={(e) => e.stopPropagation()}
        onChange={clickCheck}
        checked={checkId.some((id) => id.id === props.id)}
      />
    </div>
  );
};

export default Card;
