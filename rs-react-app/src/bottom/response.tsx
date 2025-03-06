'use client';
import React, { useState } from 'react';

import { IResponse, Person } from '../other/interfases';
import Card from './card/card';
import style from './response.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { destroy } from '../redux/checkSave';
import { saveAs } from 'file-saver';
import { useTheme } from '../other/context/useTheme';
import { useRouter } from 'next/router';
import NotFound from '../../pages/404';
interface S {
  data: IResponse | null;
  page: number;
  search: string;
}

const Response: React.FC<S> = ({ data, page, search }) => {
  const itemInPage = 10;
  const checkedId = useSelector((state: RootState) => state.checkSave.person);
  const dispatch = useDispatch();
  const [errorband, setErrorband] = useState(false);
  const navigate = useRouter();
  const { theme } = useTheme();

  const clickError = () => {
    setErrorband(true);
  };

  const deletBtn = () => {
    dispatch(destroy());
  };

  const download = () => {
    const strData = JSON.stringify(checkedId, null, 2);
    const blob = new Blob([strData], { type: 'application/json' });
    saveAs(blob, `${checkedId.length}_peoples.csv`);
  };

  const clickprev = () => {
    navigate.push(`/${Number(page) - 1}?search=${search}`);
  };

  const clicknext = () => {
    navigate.push(`/${Number(page) + 1}?search=${search}`);
  };

  const totalPages = data ? Math.ceil(data.count / itemInPage) : 0;

  if (errorband) {
    throw new Error('Error');
  }
  if (!data || !data.results) {
    return <NotFound />;
  }

  return (
    <div className={style.response_wrapper}>
      {data?.results.length === 0 ? (
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
