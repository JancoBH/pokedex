import type {GetServerSideProps, NextPage} from 'next';
import Head from 'next/head';
import {PokemonCard} from '../components/cards/PokemonCard';
import {Pagination} from '../components/pagination/Pagination';
import {useCallback, useEffect, useState} from 'react';
import { useRouter } from 'next/router';

const lastPkm = 898;

// @ts-ignore
const IndexPage: NextPage = ({pokemonList}) => {

  const { asPath, pathname, ...router } = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const setQueryParams = useCallback((page) => {

    router.push({
      pathname: '/',
      query: {
        page
      }
    });
  }, [router]);

  useEffect(() => {
    setCurrentPage(Number(router.query.page ?? 1));
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Pokédex - JancoBH</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Latest Pokémon section */}
      <section className="principal-container pt-24 lg:pt-24">
        <h2 className="text-2xl lg:text-3xl font-medium mb-8 text-center lg:text-left">Pokédex List</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">

          {
            pokemonList.map( pkmn => (
              <PokemonCard key={pkmn.id} pkmn={pkmn} />
            ))
          }

        </div>

        <Pagination
          className={'flex justify-center my-8'}
          currentPage={currentPage}
          totalCount={lastPkm}
          pageSize={16}
          onPageChange={page => setQueryParams(page)}
        />
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { page } = context.query;

  let limit = 16;

  const offset = (Number(page ?? 1) - 1) * limit;
  limit = offset === 896 ? 2 : limit;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const pokePaginationData = await res.json();

    const pokemonList = await Promise.all(
      pokePaginationData.results.map(async (poke) => {
        const pokemonResponse = await fetch(poke.url);
        const pokemonData = await pokemonResponse.json();

        return {
          id: pokemonData?.id ?? null,
          name: pokemonData?.species?.name ?? pokemonData?.name,
          img: pokemonData.sprites?.other['official-artwork']?.front_default
            ?? pokemonData.sprites?.other?.home?.front_default
            ?? pokemonData.sprites?.front_default
            ?? null,
          types: pokemonData.types?.map((type) => type.type),
        };
      })
    );

    // Pass data to the page via props
    return { props: { pokemonList } };

  } catch (err) {
    return {notFound: true};
  }

};

export default IndexPage;
