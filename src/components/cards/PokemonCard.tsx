import {Type} from '../icons';
import Image from 'next/image';

export const PokemonCard = ({pkmn}) => {

  return (
    <div className="overflow-hidden bg-white rounded-lg border-2 dark:border-gray-500 hover:shadow-lg transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-200 dark:bg-darken cursor-pointer select-none py-4 px-4">

      <Image className="object-cover w-44 md:w-40 mx-auto my-5 aspect-square" height={160} width={160} src={pkmn.img} alt={pkmn.img} title={pkmn.name} priority={true} />

      <div className="flex justify-between font-medium pt-2">

        <span className="text-lg capitalize select-all" title={pkmn.name}>{pkmn.name}</span>

        <div className="flex gap-1.5">
          {
            pkmn.types.map(type => (
              <Type key={type.name} type={type.name}/>
            ))
          }
        </div>

      </div>

    </div>
  );
};
