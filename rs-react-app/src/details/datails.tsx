'use client';
import React from 'react';
import style from './details.module.css';
import { useTheme } from '../other/context/useTheme';
import { Irez } from './../other/interfases';
import Link from 'next/link';
import NotFound from '../../app/not-found';

interface FetchPersonProps {
  data: Irez | null;
  page: number;
  search: string;
}

const Details: React.FC<FetchPersonProps> = ({ data, page, search }) => {
  const { theme } = useTheme();
  const queryString = `/${page || 1}?search=${search}`;

  return (
    <>
      {data === null ? (
        <NotFound />
      ) : (
        <div
          data-testid="div_test"
          className={
            theme === 'white' ? style.details : `${style.details} black`
          }
        >
          <p>name {data?.name}</p>
          <p>birth_year {data?.birth_year}</p>
          <p>Height: {data?.height}</p>
          <p>Mass: {data?.mass}</p>
          <p>Hair color: {data?.hair_color}</p>
          <p>Skin color: {data?.skin_color}</p>
          <p>Skin eye: {data?.eye_color}</p>

          <Link href={queryString}>
            <button className={style.btn_close}>close</button>
          </Link>
        </div>
      )}
    </>
  );
};
export default Details;
