import { Injectable } from '@angular/core';

import { Store } from '@ngpk/core/abstract';
import { CashFlowFilters } from '@ngpk/organizer/model';

@Injectable()
export class CashFlowFilterService extends Store<CashFlowFilters> {
  constructor() {
    super({
      incomeCategory: [],
      expenseCategory: [],
    });
  }
}
