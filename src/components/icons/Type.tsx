import Image from 'next/image';

export const Type = ({type, mode = 'on', width = 28, height = 28}) => {

  return (
    <Image src={`${mode === 'on' ? `/types/${type}_on.svg` : `/types/${type}_off.svg`}`} alt={type} title={type} width={width} height={height} />
  );
};
