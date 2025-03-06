'use client';
import React from 'react';
import style from './details.module.css';
import { useTheme } from '../other/context/useTheme';
import { useRouter } from 'next/router';
import { Irez } from './../other/interfases';
import NotFound from '@/pages/404';

interface FetchPersonProps {
  data: Irez;
  page: number;
  search: string;
}

const Details: React.FC<FetchPersonProps> = ({ data, page, search }) => {
  const navigate = useRouter();
  const { theme } = useTheme();
  console.log(data);

  const click = () => {
    if (page) {
      navigate.push(`/${page}?search=${search}`);
    } else {
      navigate.push(`/?search=${search}`);
    }
  };

  if ('detail' in data && data.detail === 'Not found') {
    return <NotFound />;
  }

  return (
    <>
      <div
        data-testid="div_test"
        className={theme === 'white' ? style.details : `${style.details} black`}
      >
        <p>name {data?.name}</p>
        <p>birth_year {data?.birth_year}</p>
        <p>Height: {data?.height}</p>
        <p>Mass: {data?.mass}</p>
        <p>Hair color: {data?.hair_color}</p>
        <p>Skin color: {data?.skin_color}</p>
        <p>Skin eye: {data?.eye_color}</p>

        <button className={style.btn_close} onClick={click}>
          close
        </button>
      </div>
    </>
  );
};
export default Details;
