import {Disclosure} from '@headlessui/react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Pokeball, Type} from '../icons';
import Image from 'next/image';
import {useScroll} from '../../hooks';
import {useState} from 'react';
import {Modal} from '../dialog/Modal';
import Button from '../buttons/Button';

const navigation = [
  { name: 'Trainers', href: '/trainers' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const iconCss = 'hover:opacity-60 cursor-pointer transition-all duration-200 ease-in-out';

const types = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];

export const Header = () => {

  const isScrolled = useScroll(5);
  const { asPath, route } = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [hoverType, setHoverType] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleSelectedType = (type) => {
    // toggle type
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Disclosure as="header" className={`${isScrolled && 'shadow-md'} bg-white dark:bg-dark-theme border-b dark:border-gray-700 fixed top-0 w-full z-10`}>
        {({ open }) => (
          <>
            <div className="max-w-6xl mx-auto px-5 xl:px-0">
              <div className="flex items-center justify-between h-20">

                <nav className="flex-1 flex items-center justify-start">
                  <Link href={'/'}>
                    <a className="flex-shrink-0 flex items-center">

                      <Pokeball className="h-8"/>
                      <div className="flex text-2xl text-left pl-2">
                        Pokédex
                      </div>

                    </a>
                  </Link>

                  {/* Desktop menu items */}
                  <div className="hidden md:block sm:ml-6 border-l dark:border-gray-700">
                    <div className="flex">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                        >
                          <a
                            className={classNames(
                              item.href === asPath
                                ? 'text-primary-dark dark:text-primary-light'
                                : 'text-gray-500 dark:text-gray-500 hover:text-primary-dark dark:hover:text-primary',
                              'px-3 py-2 text-lg font-medium ml-3'
                            )}
                            aria-current={item.href === asPath ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>

                <div className="flex items-center gap-2 sm:static sm:inset-auto sm:pr-0">

                  {
                    route !== '/trainers' && <Image src={'/icon_sort.svg'} alt={'Sort'} title={'Sort'} width={40} height={30} className={iconCss} />
                  }

                  <Image src={'/icon_search.svg'} alt={'Search'} title={'Search'} width={35} height={36} className={iconCss} onClick={openModal} />

                  <div className="flex items-center md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-full focus:outline-none">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <svg className="fill-gray-500 dark:fill-gray-400" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"/></svg>
                      ) : (
                        <svg className="fill-gray-500 dark:fill-gray-400" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
                      )}
                    </Disclosure.Button>
                  </div>

                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden bg-white dark:bg-dark-theme">
              {/* Mobile menu items */}
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.href === asPath
                        ? 'text-primary-dark dark:text-primary-light'
                        : 'text-gray-500 dark:text-gray-400 hover:text-primary-dark dark:hover:text-primary-light',
                      'block px-3 py-2 font-medium'
                    )}
                    aria-current={item.href === asPath ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>

            </Disclosure.Panel>
          </>
        )}

      </Disclosure>

      <Modal isOpen={isOpen} title={'Search by condition'} closeModal={() => closeModal()}>

        <div className="p-5 max-h-96 overflow-auto">
          <section className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Name</h3>

            <input type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary-dark focus:outline-none " placeholder="Ex: Pikachu"/>
          </section>

          <section className="mb-4">
            <h3 className="text-xl text-black font-semibold mb-2">Type</h3>

            <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 text-center">
              {
                types.map(type => (
                  <div key={type} id={type}
                    className={`flex flex-col select-none cursor-pointer ${ selectedTypes.length <= 1 ? '' : !selectedTypes.includes(type) ? 'pointer-events-none opacity-30' : ''}`}
                    onMouseOver={() => setHoverType(type)}
                    onMouseLeave={() => setHoverType('')}
                    onClick={() => handleSelectedType(type)}>
                    <Type type={type} mode={selectedTypes.includes(type) ? 'on' : type === hoverType ? 'on' : 'off'} width={80} height={80}/>
                    <small className="capitalize">{type} {selectedTypes.includes(type) && '✅'}</small>
                  </div>
                ))
              }
            </div>
          </section>

          <section>
            <h3 className="text-xl text-black font-semibold mb-2">Region</h3>
            <small>(soon)</small>
          </section>
        </div>

        <div className="flex justify-end p-5 bg-gray-100 dark:bg-dark-theme max-w-">
          <Button className="flex items-center gap-2 px-5 py-3">
            <Image src={'/icon_search_w.svg'} alt={'Search'} title={'Search'} width={20} height={21} />
            Search
          </Button>
        </div>

      </Modal>

    </>
  );
};
