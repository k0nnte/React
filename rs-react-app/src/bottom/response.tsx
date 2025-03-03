'use client';
import React, { useState } from 'react';
import { useFetchPeopleQuery } from '../other/rfetch';
import { Person } from '../other/interfases';
import Card from './card/card';
import style from './response.module.css';
import Loading from '../other/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { destroy } from '../redux/checkSave';
import { saveAs } from 'file-saver';
import { useTheme } from '../other/context/useTheme';
import { useRouter } from 'next/router';

const Response: React.FC = () => {
  const itemInPage = 10;
  const search = useSelector((state: RootState) => state.searchSave.search);
  const checkedId = useSelector((state: RootState) => state.checkSave.person);
  const dispatch = useDispatch();
  const [errorband, setErrorband] = useState(false);
  const navigate = useRouter();
  const searchParams = navigate.query.page;
  const { theme } = useTheme();

  const page = Number(searchParams || '1');

  const clickError = () => {
    setErrorband(true);
  };

  const { data, error, isFetching } = useFetchPeopleQuery({ search, page });

  const deletBtn = () => {
    dispatch(destroy());
  };

  const download = () => {
    const strData = JSON.stringify(checkedId, null, 2);
    const blob = new Blob([strData], { type: 'application/json' });
    saveAs(blob, `${checkedId.length}_peoples.csv`);
  };

  const clickprev = () => {
    navigate.push(`/?page=${Number(page) - 1}`);
  };

  const clicknext = () => {
    navigate.push(`/?page=${Number(page) + 1}`);
  };

  const totalPages = data ? Math.ceil(data.count / itemInPage) : 0;

  if (errorband) {
    throw new Error('Error');
  }

  return (
    <div className={style.response_wrapper}>
      {error ? (
        <div className={style.response_other}>
          <p>Error: {error.toString()}</p>
        </div>
      ) : isFetching ? (
        <div className={style.response_other}>
          <Loading />
        </div>
      ) : data?.results.length === 0 ? (
        <div>
          <p>Not Found</p>
        </div>
      ) : (
        <div className={style.response}>
          <div className={style.response_left}>
            {data?.results.map((person: Person, index: number) => (
              <Card
                key={person.name}
                {...person}
                id={`${Number(page) > 0 ? (Number(page) - 1) * itemInPage + index + 1 : index + 1}`}
              />
            ))}
            <div className={style.wrapper_pagination}>
              <button
                className={style.btn_pagination}
                onClick={clickprev}
                disabled={Number(page) <= 1}
              >
                prev
              </button>
              <button
                className={style.btn_pagination}
                onClick={clicknext}
                disabled={Number(page) >= totalPages}
              >
                next
              </button>
            </div>
          </div>
        </div>
      )}

      <button className={style.error_btn} onClick={clickError}>
        Error button
      </button>
      <div
        className={`${style.checked_items} ${checkedId.length > 0 ? style.visible : ''} ${theme === 'white' ? '' : 'black'}`}
      >
        <p>{checkedId.length} items are selected</p>
        <div className={style.wrapper_btn}>
          <button onClick={deletBtn}>Unselect all</button>
          <button onClick={download}>Download</button>
        </div>
      </div>
    </div>
  );
};

export default Response;
