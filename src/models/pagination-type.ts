export interface IPagination {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}
