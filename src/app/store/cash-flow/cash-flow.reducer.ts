import { createReducer, on } from '@ngrx/store';

import { CashFlow } from '#cash-flow/models';
import { AuthActions } from '#store/auth';
import { CashFlowActions } from '#store/cash-flow';

export const FeatureKey = 'cashflow';

export interface State {
  incomes: CashFlow[];
  expenses: CashFlow[];
  isLoading: boolean;
}

const initialState: State = {
  incomes: [],
  expenses: [],
  isLoading: false,
};

export const Reducer = createReducer(
  initialState,

  on(CashFlowActions.getExpenses, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(CashFlowActions.getExpensesSuccess, (state, { expenses }): State => {
    return { ...state, expenses, isLoading: false };
  }),
  on(CashFlowActions.getExpensesFailure, (state): State => {
    return { ...state, isLoading: false };
  }),
  on(CashFlowActions.getIncomes, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(CashFlowActions.getIncomesSuccess, (state, { incomes }): State => {
    return { ...state, incomes, isLoading: false };
  }),
  on(CashFlowActions.getIncomesFailure, (state): State => {
    return { ...state, isLoading: false };
  }),
  on(AuthActions.signOut, (): State => {
    return { incomes: [], expenses: [], isLoading: false };
  })
);
