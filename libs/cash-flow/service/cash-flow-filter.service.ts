import { Injectable } from '@angular/core';

import { CashFlowFilters } from '@ngpk/cash-flow/model';
import { Store } from '@ngpk/core/abstract';

@Injectable()
export class CashFlowFilterService extends Store<CashFlowFilters> {
  constructor() {
    super({
      incomeCategory: [],
      expenseCategory: [],
    });
  }
}
