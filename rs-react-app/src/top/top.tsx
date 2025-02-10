import React, { createRef } from 'react';
import './top.css';
import { useDispatch } from 'react-redux';
import { setSearch } from '../redux/searchSave';
import useLocalStorage from '../other/localhook';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Top: React.FC = () => {
  const [data, setData] = useLocalStorage('search', '');
  const inputref = createRef<HTMLInputElement>();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const click = () => {
    if (inputref.current) {
      if (inputref.current.value.trim() === data) {
        return;
      }
      // onSearch(inputref.current.value.trim());
      searchParams.delete('details');
      navigate(`/?${searchParams.toString()}`);
      dispatch(setSearch(inputref.current.value.trim()));
      setData(inputref.current.value.trim());
    }
  };

  return (
    <div className="search_vrapper">
      <input
        type="text"
        className="input_search"
        defaultValue={data}
        ref={inputref}
      />
      <button className="btn_search" onClick={click}>
        Search
      </button>
    </div>
  );
};

export default Top;
