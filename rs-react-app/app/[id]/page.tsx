'use client';
import React from 'react';
import load from '../../src/assets/load.gif';
import './details.css';
import { useFetchPeopleQuery } from '../../src/other/fetchData';
import { useTheme } from '../../src/other/context/useTheme';
import {
  useRouter,
  useParams,
  useSearchParams,
  notFound,
} from 'next/navigation';
import Image from 'next/image';

const Details: React.FC = () => {
  const navigate = useRouter();
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const { id } = useParams();
  const { data, isFetching, isError } = useFetchPeopleQuery({
    id: Number(id),
  });

  const click = () => {
    navigate.push(`/?${searchParams.toString()}`);
  };

  if (isError) {
    notFound();
  }
  return (
    <>
      {isFetching ? (
        <Image
          className="loadtwo"
          src={load}
          alt="Loading..."
          width={500}
          height={500}
        />
      ) : (
        <div
          data-testid="div_test"
          className={theme === 'white' ? 'details' : 'details black'}
        >
          <p>name {data?.name}</p>
          <p>birth_year {data?.birth_year}</p>
          <p>Height: {data?.height}</p>
          <p>Mass: {data?.mass}</p>
          <p>Hair color: {data?.hair_color}</p>
          <p>Skin color: {data?.skin_color}</p>
          <p>Skin eye: {data?.eye_color}</p>

          <button className="btn_close" onClick={click}>
            close
          </button>
        </div>
      )}
    </>
  );
};
export default Details;
