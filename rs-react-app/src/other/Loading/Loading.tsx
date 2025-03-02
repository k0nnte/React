import React from 'react';
import load from '../../assets/load.gif';
import Image from 'next/image';

const Loading: React.FC = () => {
  return (
    <Image src={load} alt="Loading..." unoptimized width={700} height={500} />
  );
};

export default Loading;
