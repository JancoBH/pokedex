import {useRouter} from 'next/router';
import {MemorizedType} from '../icons';
import Button from '../buttons/Button';
import Image from 'next/image';
import {Modal} from './Modal';
import React, {useState} from 'react';

const types = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];

export const SearchModal = ({isOpen, onDialogClose}) => {

  const router = useRouter();

  const [hoverType, setHoverType] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectedType = (type) => {
    // toggle type
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const q = e.currentTarget.value;
    setSearchQuery(q);

    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    let params = {};

    if (searchQuery) {
      params = {...params, q: searchQuery.toLowerCase()};
    } else {
      // eslint-disable-next-line
      delete params['q'];
    }

    if (selectedTypes.length === 0) {
      // eslint-disable-next-line
      delete params['type'];
    } else {
      params = {...params, type: selectedTypes.join('-')};
    }

    router.push(
      {
        pathname: '/',
        query: params,
      }
    );

    setSearchQuery('');
    onDialogClose();
  };

  return (
    <Modal isOpen={isOpen} title={'Search by condition'} closeModal={() => onDialogClose()}>

      <div className="p-5 max-h-96 overflow-auto">
        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Name</h3>

          <input type="text"
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary-dark focus:outline-none"
            placeholder="Ex: Pikachu"
            onKeyUp={handleKeyUp}
          />
        </section>

        <section className="mb-4">
          <h3 className="text-xl text-black font-semibold mb-2">Type <small>(Soon)</small></h3>

          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 text-center">
            {
              types.map(type => (
                <div key={type} id={type}
                  className={`flex flex-col select-none cursor-pointer ${ selectedTypes.length <= 1 ? '' : !selectedTypes.includes(type) ? 'pointer-events-none opacity-30' : ''}`}
                  onMouseOver={() => setHoverType(type)}
                  onMouseLeave={() => setHoverType('')}
                  onClick={() => handleSelectedType(type)}>
                  <MemorizedType type={type} mode={selectedTypes.includes(type) ? 'on' : type === hoverType ? 'on' : 'off'} width={80} height={80}/>
                  <small className="capitalize">{type} {selectedTypes.includes(type) && '✅'}</small>
                </div>
              ))
            }
          </div>
        </section>

        <section>
          <h3 className="text-xl text-black font-semibold mb-2">Region <small>(Soon)</small></h3>
        </section>
      </div>

      <div className="flex justify-end p-5 bg-gray-100 dark:bg-dark-theme max-w-">
        <Button className="flex items-center gap-2 px-5 py-3" onClick={() => handleSearch()}>
          <Image src={'/icon_search_w.svg'} alt={'Search'} title={'Search'} width={20} height={21} />
          Search
        </Button>
      </div>

    </Modal>
  );

};
