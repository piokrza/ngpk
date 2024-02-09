import { Injectable } from '@angular/core';

import { CashFlowFilters } from '#cash-flow/models';
import { State } from '#core/abstracts';

const initialState: CashFlowFilters = {
  incomeCategory: [],
  expenseCategory: [],
};

@Injectable()
export class CashFlowFilterService extends State<CashFlowFilters> {
  constructor() {
    super(initialState);
  }
}
