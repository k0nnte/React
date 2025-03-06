'use client';
import React from 'react';
import { ICard } from '../../other/interfases';
import style from './card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { add, deleteItem } from '../../redux/checkSave';
import { RootState } from '../../redux/store';
import { useTheme } from '../../other/context/useTheme';
import { useRouter } from 'next/router';

const Card: React.FC<ICard> = (props) => {
  const navigate = useRouter();
  const id = navigate.query.deteils;

  const dispatch = useDispatch();
  const checkId = useSelector((state: RootState) => state.checkSave.person);
  const { theme } = useTheme();
  const { page } = navigate.query;
  const search = navigate.query.search || '';
  const click = () => {
    if ((props.id !== undefined && id === undefined) || id === '') {
      if (page) {
        navigate.push(`/${page}/?search=${search}&deteils=${props.id}`);
      } else {
        navigate.push(`/${1}?search=${search}&deteils=${props.id}`);
      }
    } else {
      if (page) {
        navigate.push(`/${page}?search=${search}`);
      } else {
        navigate.push(`/${1}?search=${search}`);
      }
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
      className={theme === 'white' ? style.card : `${style.card} black`}
      onClick={click}
    >
      <p className={style.item}>{props.name}</p>
      <div className={style.description}>
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
        className={style.ckeckBox}
      />
    </div>
  );
};

export default Card;
