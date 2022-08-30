import {Type} from '../icons';
import Image from 'next/image';
import {Pokemon} from '../../models';

export const PokemonCard = ({pokemon}: {pokemon: Pokemon}) => {

  const {id, name, img, types} = pokemon;

  return (
    <div className="relative overflow-hidden bg-white rounded-lg border-2 dark:border-gray-500 hover:shadow-lg transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-200 dark:bg-darken cursor-pointer select-none py-4 px-4">

      <span className="absolute top-3 right-3 text-xl font-bold">{`#${id.toString().padStart(3, '0')}`}</span>

      <Image className="object-cover w-44 md:w-40 mx-auto my-5 aspect-square" height={160} width={160} src={img} alt={img} title={name} priority={true} />

      <div className="flex justify-between font-medium pt-2">

        <span className="text-lg capitalize select-all" title={name}>{name}</span>

        <div className="flex gap-1.5">
          {
            types.map(type => (
              <Type key={type.name} type={type.name}/>
            ))
          }
        </div>

      </div>

    </div>
  );
};
