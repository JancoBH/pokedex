import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {trainerSlice} from '../features/trainer/trainerSlice';
import {pokemonSlice} from '../features/pokemon/pokemonSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      pokemon: pokemonSlice.reducer,
      trainer: trainerSlice.reducer,
    }
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store;
