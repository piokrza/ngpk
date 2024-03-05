import { Injectable } from '@angular/core';

import { CashFlowFilters } from '#cash-flow/models';
import { Store } from '#core/abstracts';

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
