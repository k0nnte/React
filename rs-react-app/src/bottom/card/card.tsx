'use client';
import React from 'react';
import { ICard } from '../../other/interfases';
import style from './card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { add, deleteItem } from '../../redux/checkSave';
import { RootState } from '../../redux/store';
import { useTheme } from '../../other/context/useTheme';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

const Card: React.FC<ICard> = (props) => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const det = searchParams.get('deteils');

  const dispatch = useDispatch();
  const checkId = useSelector((state: RootState) => state.checkSave.person);
  const { theme } = useTheme();
  const { id } = useParams();

  const href =
    (props.id !== undefined && det === null) || det === ''
      ? id
        ? `/${id}/?search=${search}&deteils=${props.id}`
        : `/${1}?search=${search}&deteils=${props.id}`
      : id
        ? `/${id}?search=${search}`
        : `/${1}?search=${search}`;

  const clickCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      dispatch(add(props));
    } else {
      dispatch(deleteItem(props));
    }
  };
  return (
    <Link href={href}>
      <div
        data-testid="card_test"
        className={theme === 'white' ? style.card : `${style.card} black`}
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
    </Link>
  );
};

export default Card;
