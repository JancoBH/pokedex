export interface PokemonExternalData {
  name: string;
  url: string;
}

export interface PokemonAbility {
  ability: PokemonExternalData;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonType {
  slot: number;
  type: PokemonExternalData;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: PokemonExternalData;
}

export interface PokemonSprite {
  front_default: string;
  back_default: string;
  front_shiny: string;
  other: {
    home: {
      front_default: string;
      front_shiny: string;
    },
    'official-artwork': {
      front_default: string;
    }
  };
}

export interface Pokemon {
  id: number;
  name: string;
  abilities: PokemonAbility[];
  types: PokemonExternalData[];
  stats: PokemonStat[];
  forms: PokemonExternalData[];
  species: PokemonExternalData;
  sprites: PokemonSprite;
  img: string;
  height: number;
  weight: number;
}
