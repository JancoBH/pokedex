import {Dialog, Transition} from '@headlessui/react';
import {Fragment} from 'react';
import Image from 'next/image';

export const Modal = ({isOpen, title, closeModal, children}) => {

  return (

    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded bg-white dark:bg-darken text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="text-black dark:text-gray-50 text-3xl font-medium leading-6 flex items-center justify-between bg-gray-100 dark:bg-dark-theme p-5"
                >
                  {title}
                  <Image src={'/close.svg'} alt={'Search'} title={'Close'} width={20} height={20} className="hover:opacity-60 cursor-pointer dark:invert" onClick={closeModal} />
                </Dialog.Title>
                {
                  children
                }
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>

  );
};
