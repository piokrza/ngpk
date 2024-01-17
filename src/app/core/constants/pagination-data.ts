import { PaginatorState } from 'primeng/paginator';

export const rowsPerPageOptions = [2, 4, 6];
export const initialPaginationData: PaginatorState = {
  page: 0,
  first: 0,
  rows: rowsPerPageOptions[0],
  pageCount: rowsPerPageOptions[0],
};
