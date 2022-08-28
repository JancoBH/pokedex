import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import {pokeApi} from '../services/pokeapi';
import {setupListeners} from '@reduxjs/toolkit/query';

export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      [pokeApi.reducerPath]: pokeApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokeApi.middleware).concat(),
  });
}

const store = makeStore();

setupListeners(store.dispatch);

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store;
