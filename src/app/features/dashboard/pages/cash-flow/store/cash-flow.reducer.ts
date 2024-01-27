import { createReducer, on } from '@ngrx/store';

import { AuthActions } from '#auth/store';
import { CashFlow } from '#cash-flow/models';
import { CashFlowActions } from '#cash-flow/store';

export const FeatureKey = 'cashflow';

export interface State {
  cashFlow: CashFlow[];
  incomesFilter: string[];
  expensesFilter: string[];
  isLoading: boolean;
}

const initialState: State = {
  cashFlow: [],
  isLoading: false,
  incomesFilter: [],
  expensesFilter: [],
};

export const Reducer = createReducer(
  initialState,

  on(CashFlowActions.loadCashFlow, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(CashFlowActions.loadCashFlowSuccess, (state, { cashFlow }): State => {
    return { ...state, cashFlow, isLoading: false };
  }),
  on(CashFlowActions.loadCashFlowFailure, (state): State => {
    return { ...state, isLoading: false };
  }),
  on(CashFlowActions.setIncomesFilter, (state, { categoryIds }): State => {
    return { ...state, isLoading: false, incomesFilter: categoryIds };
  }),
  on(CashFlowActions.setExpensesFilter, (state, { categoryIds }): State => {
    return { ...state, isLoading: false, expensesFilter: categoryIds };
  }),
  on(AuthActions.signOut, (): State => {
    return { cashFlow: [], incomesFilter: [], expensesFilter: [], isLoading: false };
  })
);
