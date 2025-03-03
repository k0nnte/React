'use client';
import React, { createRef } from 'react';
import style from './top.module.css';
import { useDispatch } from 'react-redux';
import { setSearch } from '../redux/searchSave';
import useLocalStorage from '../other/localhook';
import { useTheme } from '../other/context/useTheme';
import { useRouter } from 'next/router';

const Top: React.FC = () => {
  const [data, setData] = useLocalStorage('search', '');
  const inputref = createRef<HTMLInputElement>();
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { theme, setTheme } = useTheme();

  const click = () => {
    if (inputref.current) {
      if (inputref.current.value.trim() === data) {
        return;
      }
      navigate.push(`/`);
      dispatch(setSearch(inputref.current.value.trim()));
      setData(inputref.current.value.trim());
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'white' ? 'dark' : 'white');
  };

  return (
    <div
      className={
        theme === 'white'
          ? style.search_vrapper
          : `${style.search_vrapper} black`
      }
    >
      <input
        type="text"
        className={style.input_search}
        defaultValue={data}
        ref={inputref}
      />
      <button
        className={
          theme === 'white' ? style.btn_search : `${style.btn_search} black`
        }
        onClick={click}
      >
        Search
      </button>
      <select
        className={style.theme_select}
        value={theme}
        onChange={toggleTheme}
      >
        <option value="white">white</option>
        <option value="dark">dark</option>
      </select>
    </div>
  );
};

export default Top;
