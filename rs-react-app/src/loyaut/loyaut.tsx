import App from '../App';
import React from 'react';

interface ILoyaut {
  children?: React.ReactNode;
}

const Loyaut: React.FC<ILoyaut> = ({ children }) => {
  return <App>{children}</App>;
};

export default Loyaut;
