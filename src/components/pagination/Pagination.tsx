import { IPagination } from '../../models';
import { DOTS, usePagination } from '../../hooks';

export interface PaginationProps extends IPagination {
  className?: string;
}

const defaultCss = 'w-10 h-10 my-auto mx-1 border border-gray-500 rounded flex items-center justify-center hover:opacity-90';
const disabledCss = 'pointer-events-none opacity-30 hover:cursor-default bg-transparent';

export const Pagination = ({onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className = ''}: PaginationProps) => {

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  }) || [];

  // If there are less than 2 times in pagination range we shall not render the component
  if (paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={`${className} flex select-none list-none`}>
      <li
        className={`${defaultCss} ${currentPage === 1 ? disabledCss : 'cursor-pointer'}`}
        onClick={onPrevious}
      >
        <i className='bx bx-chevron-left bx-sm' />
      </li>
      {paginationRange.map( (pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <li className={`${defaultCss} hover:cursor-default hover:bg-transparent`} key={pageNumber + index}>&#8230;</li>;
        }

        return (
          <li
            className={`${defaultCss} hover:text-white hover:cursor-pointer hover:bg-primary ${pageNumber === currentPage ? 'bg-primary dark:bg-primary-dark text-white' : ''}`}
            key={pageNumber}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`${defaultCss}  ${currentPage === lastPage ? disabledCss : 'cursor-pointer'}`}
        onClick={onNext}
      >
        <i className='bx bx-chevron-right bx-sm' />
      </li>
    </ul>
  );
};
