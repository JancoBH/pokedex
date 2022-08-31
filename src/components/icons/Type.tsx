import Image from 'next/image';
import React from 'react';

export const Type = ({type, mode = 'on', width = 28, height = 28}) => {

  return (
    <Image src={`${mode === 'on' ? `/types/${type}_on.svg` : `/types/${type}_off.svg`}`} alt={type} title={type} width={width} height={height} />
  );
};

export const MemorizedType = React.memo(Type);
