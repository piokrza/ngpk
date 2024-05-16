import { PaginatorState } from 'primeng/paginator';

import { CashFlow } from '@ngpk/organizer/model';

export interface CashFlowData {
  paginatedCashFlow: CashFlow[];
  totalLength: number;
  paginatorState: PaginatorState;
}
