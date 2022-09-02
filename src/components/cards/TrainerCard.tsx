import {Trainer} from '../../models';
import Image from 'next/image';

export const TrainerCard = ({trainer}: {trainer: Trainer}) => {

  const {name, team, box} = trainer;

  return (
    <div className="overflow-hidden bg-white rounded-lg border-2 dark:border-gray-500 hover:shadow-lg transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-200 dark:bg-darken cursor-pointer select-none py-4 px-4">

      <div className="font-medium">

        <span className="text-lg capitalize select-all" title={name}>{name}</span>

        <div className="grid grid-cols-3 gap-1.5">
          {
            team.map((team, index) => (
              <Image key={index} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${team}.png`}
                alt={'Pokemon #' + team} width={80} height={80} title={`Pokémon #${team.toString().padStart(3, '0')}`}/>
            ))
          }
        </div>

        <p className="text-center">{box.length} Pokémon in box📦</p>

      </div>

    </div>
  );
};
