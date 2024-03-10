import { PaginatorState } from 'primeng/paginator';

import { CashFlow } from '@ngpk/cash-flow/model';

export interface CashFlowData {
  paginatedCashFlow: CashFlow[];
  totalLength: number;
  paginatorState: PaginatorState;
}
