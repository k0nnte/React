'use client';
import React from 'react';
import load from '../../src/assets/load.gif';
import style from './details.module.css';
import { useFetchPeopleQuery } from '../other/fetchData';
import { useTheme } from '../other/context/useTheme';
import { useRouter } from 'next/router';
import Image from 'next/image';
import NotFound from '../../pages/404';

const Details: React.FC = () => {
  const navigate = useRouter();
  const { theme } = useTheme();
  const searchParams = navigate.query.page;

  const { id } = navigate.query;
  const { data, isFetching, isError } = useFetchPeopleQuery({
    id: Number(id),
  });
  console.log(isError);

  const click = () => {
    if (searchParams) {
      navigate.push(`/?page=${searchParams.toString()}`);
    } else {
      navigate.push('/?');
    }
  };

  return (
    <>
      {isFetching ? (
        <Image
          className={style.loadtwo}
          src={load}
          alt="Loading..."
          width={500}
          height={500}
        />
      ) : isError ? (
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

          <button className={style.btn_close} onClick={click}>
            close
          </button>
        </div>
      )}
    </>
  );
};
export default Details;
