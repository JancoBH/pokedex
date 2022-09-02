import {getTrainersAsync, selectTrainer} from './trainerSlice';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useCallback, useEffect, useState} from 'react';
import {TrainerCard} from '../../components/cards/TrainerCard';
import {Pagination} from '../../components';
import {useRouter} from 'next/router';
import {Trainer} from '../../models';

const maxTrainers = 8;

export const Trainers = () => {

  const dispatch = useAppDispatch();
  const {trainers, status} = useAppSelector(selectTrainer);

  const router = useRouter();
  const [slicedTrainers, setSlicesTrainers] = useState<Trainer[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const setQueryParams = useCallback((page) => {
    router.push({
      pathname: '/trainers',
      query: {...router.query, page}
    });
  }, [router]);

  useEffect(() => {
    setCurrentPage(Number(router.query.page ?? 1));
  }, [router.query]);

  useEffect(() => {
    dispatch(getTrainersAsync());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      const start = (currentPage - 1) * maxTrainers;
      const end = start + maxTrainers;
      setSlicesTrainers(trainers.slice(start, end));
    }
  }, [currentPage, status, trainers]);


  return(
    <section className="principal-container pt-24 lg:pt-24">
      <h2 className="text-2xl lg:text-3xl font-medium mb-8 text-center lg:text-left">Trainers List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
        {
          slicedTrainers.map((trainer, index) => (
            <TrainerCard key={index} trainer={trainer}/>
          ))
        }
      </div>

      <Pagination
        className={'flex justify-center my-8'}
        currentPage={currentPage}
        totalCount={trainers.length}
        pageSize={maxTrainers}
        onPageChange={page => setQueryParams(page)}
      />

    </section>
  );

};
