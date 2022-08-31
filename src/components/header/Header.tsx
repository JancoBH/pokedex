import {Disclosure} from '@headlessui/react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Pokeball} from '../icons';
import Image from 'next/image';
import {useScroll} from '../../hooks';
import {useState} from 'react';
import {SearchModal} from '../dialogs/SearchModal';
import {SortModal} from '../dialogs/SortModal';

const navigation = [
  { name: 'Trainers', href: '/trainers' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const iconCss = 'hover:opacity-60 cursor-pointer transition-all duration-200 ease-in-out';

export const Header = () => {

  const isScrolled = useScroll(5);
  const { asPath, route } = useRouter();

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

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
                    route !== '/trainers' && <Image src={'/icon_sort.svg'} alt={'Sort'} title={'Sort'} width={40} height={30} className={iconCss} onClick={() => setIsSortModalOpen(true)} />
                  }

                  <Image src={'/icon_search.svg'} alt={'Search'} title={'Search'} width={35} height={36} className={iconCss} onClick={() => setIsSearchModalOpen(true)} />

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

      <SearchModal isOpen={isSearchModalOpen} onDialogClose={() => setIsSearchModalOpen(false)}/>
      <SortModal isOpen={isSortModalOpen} onDialogClose={() => setIsSortModalOpen(false)}/>

    </>
  );
};
