import React from 'react';
import load from '../../assets/load.gif';

class Loading extends React.Component {
  render() {
    return <img src={load} alt="Loading..." />;
  }
}

export default Loading;
