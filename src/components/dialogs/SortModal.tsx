import {Modal} from './Modal';
import React from 'react';
import Button from '../buttons/Button';
import {useRouter} from 'next/router';
import {ArrowRight} from '../icons/ArrowRight';

const sortBtnCSS = 'flex items-center justify-center w-1/2 h-14 focus:ring-0 group';

export const SortModal = ({isOpen, onDialogClose}) => {

  const router = useRouter();

  const handleSort = (sort) => {

    router.push(
      {
        pathname: '/',
        query: {...router.query, sort},
      }
    );

    onDialogClose();
  };

  return (
    <Modal isOpen={isOpen} title={'Change sort'} closeModal={() => onDialogClose()}>

      <div className="p-5 max-h-96 overflow-auto">
        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Number</h3>

          <div className="flex gap-6">
            <Button typeButton={router.query.sort === 'numAsc' || !router.query.sort ? 'basic' : 'outline'} className={sortBtnCSS} onClick={() => handleSort('numAsc')}>
              1
              <ArrowRight className={`${router.query.sort === 'numAsc' || !router.query.sort ? 'fill-white' : 'fill-primary'} group-hover:fill-white`}/>
              9
            </Button>

            <Button typeButton={router.query.sort === 'numDesc' ? 'basic' : 'outline'} className={sortBtnCSS} onClick={() => handleSort('numDesc')}>
              9
              <ArrowRight className={`${router.query.sort === 'numDesc' ? 'fill-white' : 'fill-primary'} group-hover:fill-white`}/>
              1
            </Button>
          </div>

        </section>

        <section className="mb-4">
          <h3 className="text-xl text-black font-semibold mb-2">Name</h3>

          <div className="flex gap-6">
            <Button typeButton={router.query.sort === 'nameAsc' ? 'basic' : 'outline'} className={sortBtnCSS} onClick={() => handleSort('nameAsc')}>
              A
              <ArrowRight className={`${router.query.sort === 'nameAsc' ? 'fill-white' : 'fill-primary'} group-hover:fill-white`}/>
              Z
            </Button>

            <Button typeButton={router.query.sort === 'nameDesc' ? 'basic' : 'outline'} className={sortBtnCSS} onClick={() => handleSort('nameDesc')}>
              Z
              <ArrowRight className={`${router.query.sort === 'nameDesc' ? 'fill-white' : 'fill-primary'} group-hover:fill-white`}/>
              A
            </Button>
          </div>
        </section>
      </div>

    </Modal>
  );

};
