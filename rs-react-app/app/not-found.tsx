import React from 'react';
import style from '../src/other/404/NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={style.errorPage} data-testid="errorpage">
      404 Page Not Found
    </div>
  );
};

export default NotFound;
