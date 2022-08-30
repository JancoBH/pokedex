import {createSlice} from '@reduxjs/toolkit';
import {Pokemon} from '../../models';
import {AppState} from '../../app/store';

export interface PokemonState {
  pokemon: Pokemon;
  favorites: Pokemon[];
  status: 'idle' | 'loading' | 'failed'
}

const initialState: PokemonState = {
  pokemon: {} as Pokemon,
  favorites: [] as Pokemon[],
  status: 'idle',
};


export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    getFavoriteNews: (state) => {
      state.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    },
    addFavoriteNews(state, {payload}) {
      state.favorites.push(payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    removeFavoriteNews(state, {payload}) {
      state.favorites = state.favorites.filter(pkmn => pkmn.id !== payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const selectPokemon = (state: AppState) => state.pokemon;

export default pokemonSlice.reducer;


