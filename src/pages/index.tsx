import type {GetServerSideProps, NextPage} from 'next';
import Head from 'next/head';
import {PokemonCard, Pagination, Chip} from '../components';
import {useCallback, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import {Pokemon} from '../models';

const lastPkm = 898;

const IndexPage: NextPage = ({pokemonList, totalPkmn}: {pokemonList: Pokemon[], totalPkmn: number}) => {

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const setQueryParams = useCallback((page) => {
    router.push({
      pathname: '/',
      query: {...router.query, page}
    });
  }, [router]);

  useEffect(() => {
    setCurrentPage(Number(router.query.page ?? 1));
  }, [router.query]);

  const handleChipClose = () => {
    delete router.query.q;
    router.replace( { pathname: '/', query: {...router.query} } );
  };

  return (
    <>
      <Head>
        <title>Pokédex - JancoBH</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Pokédex Section */}
      <section className="principal-container pt-24 lg:pt-24 min-h-[85vh]">
        <div className="flex items-center mb-8 gap-4">
          <h2 className="text-2xl lg:text-3xl font-medium text-center lg:text-left">Pokédex List</h2>

          {
            router.query.q && <Chip text={`Search name results "${router.query.q}"`} onCloseChip={() => handleChipClose()}/>
          }
        </div>

        {
          pokemonList.length > 0
            ?
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
              {
                pokemonList.map( pkmn => (
                  <PokemonCard key={pkmn.id} pokemon={pkmn} />
                ))
              }
            </div>
            :
            <div className="flex justify-center items-center h-96">
              <p className="text-4xl font-semibold mb-2">Pokémon not found</p>
            </div>
        }

        <Pagination
          className={'flex justify-center my-8'}
          currentPage={currentPage}
          totalCount={totalPkmn}
          pageSize={16}
          onPageChange={page => setQueryParams(page)}
        />
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { page, sort, q } = context.query;

  const show = 16;
  const init = (Number(page ?? 1) - 1) * show;
  const end = Number(page ?? 1) * show;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${lastPkm}`);
    let {results} = await res.json();

    if (sort === 'nameDesc') {
      results.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (sort === 'numDesc') {
      results.sort((a, b) => b.url.split('/')[6] - a.url.split('/')[6]);
    }

    // filter results by query params
    if (q) {
      results = results.filter(pkmn => pkmn.name.includes(q));
    }

    const paginatePokeData = results.slice(init, end);

    const pokemonList: Pokemon[] = await Promise.all(
      paginatePokeData.map(async (poke) => {
        const pokemonResponse = await fetch(poke.url);
        const pokemonData = await pokemonResponse.json();

        return {
          id: pokemonData?.id ?? 0,
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
    const totalPkmn = results.length;

    return { props: { pokemonList, totalPkmn } };

  } catch (err) {
    return {notFound: true};
  }

};

export default IndexPage;
