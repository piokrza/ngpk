import { Injectable } from '@angular/core';

import { Store } from '@ngpk/core/abstract';
import { CashFlowFilters } from '@ngpk/organizer/model';

const initialState: CashFlowFilters = {
  incomeCategory: [],
  expenseCategory: [],
};

@Injectable()
export class CashFlowFilterService extends Store<CashFlowFilters> {
  constructor() {
    super(initialState);
  }
}
