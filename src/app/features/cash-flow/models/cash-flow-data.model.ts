import { PaginatorState } from 'primeng/paginator';

import { CashFlow } from '#cash-flow/models';

export interface CashFlowData {
  paginatedCashFlow: CashFlow[];
  totalLength: number;
  paginatorState: PaginatorState;
}
