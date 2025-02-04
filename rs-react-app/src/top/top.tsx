import React, { createRef } from 'react';
import './top.css';
import { TopProps } from '../other/interfases';

const Top: React.FC<TopProps> = ({ search, onSearch }) => {
  const inputref = createRef<HTMLInputElement>();

  const click = () => {
    if (inputref.current) {
      onSearch(inputref.current.value.trim());
    }
  };

  return (
    <div className="search_vrapper">
      <input
        type="text"
        className="input_search"
        defaultValue={search}
        ref={inputref}
      />
      <button className="btn_search" onClick={click}>
        Search
      </button>
    </div>
  );
};

export default Top;
