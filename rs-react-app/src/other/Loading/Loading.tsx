import React from 'react';
import load from '../../assets/load.gif';
import Image from 'next/image';

const Loading: React.FC = () => {
  return <Image src={load} alt="Loading..." unoptimized />;
};

export default Loading;
