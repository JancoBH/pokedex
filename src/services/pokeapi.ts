import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface queryParams {
  limit: number
  offset: number
}

interface PokemonResponse {
  count: number
  next: string
  previous: string
  results: any[]
}

// Define a service using a base URL and expected endpoints
export const pokeApi = createApi({
  reducerPath: 'pokeApi',
  keepUnusedDataFor: 86400,
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    pokemonList: builder.query<PokemonResponse, queryParams>({
      query: params =>`pokemon?limit=${params.limit}&offset=${params.offset}`
    }),
    pokemonData: builder.query<any, number>({
      query: id =>`pokemon/${id}`
    }),
  }),
});

export const { usePokemonListQuery, usePokemonDataQuery } = pokeApi;
