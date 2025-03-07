import React from 'react';
import load from '../src/assets/load.gif';
import Image from 'next/image';

const Loading: React.FC = () => {
  return (
    <Image src={load} alt="Loading..." unoptimized width={500} height={500} />
  );
};

export default Loading;
