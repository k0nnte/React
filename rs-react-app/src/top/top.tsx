import React, { createRef } from 'react';
import './top.css';
import { TopProps } from '../other/interfases';

class Top extends React.Component<TopProps> {
  inputref = createRef<HTMLInputElement>();

  click = () => {
    if (this.inputref.current) {
      this.props.onSearch(this.inputref.current.value.trim());
    }
  };

  render(): React.ReactNode {
    return (
      <div className="search_vrapper">
        <input
          type="text"
          className="input_search"
          defaultValue={this.props.search}
          ref={this.inputref}
        />
        <button className="btn_search" onClick={this.click}>
          Search
        </button>
      </div>
    );
  }
}

export default Top;
