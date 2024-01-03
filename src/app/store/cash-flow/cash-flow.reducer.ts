import { createReducer, on } from '@ngrx/store';

import { CashFlow } from '#cash-flow/models';
import { AuthActions } from '#store/auth';
import { CashFlowActions } from '#store/cash-flow';

export const FeatureKey = 'cashflow';

export interface State {
  incomes: CashFlow[];
  expenses: CashFlow[];
  incomesFilter: string[];
  expensesFilter: string[];
  isLoading: boolean;
}

const initialState: State = {
  incomes: [],
  expenses: [],
  isLoading: false,
  incomesFilter: [],
  expensesFilter: [],
};

export const Reducer = createReducer(
  initialState,

  on(CashFlowActions.loadExpenses, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(CashFlowActions.loadExpensesSuccess, (state, { expenses }): State => {
    return { ...state, expenses, isLoading: false };
  }),
  on(CashFlowActions.loadExpensesFailure, (state): State => {
    return { ...state, isLoading: false };
  }),
  on(CashFlowActions.loadIncomes, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(CashFlowActions.loadIncomesSuccess, (state, { incomes }): State => {
    return { ...state, incomes, isLoading: false };
  }),
  on(CashFlowActions.loadIncomesFailure, (state): State => {
    return { ...state, isLoading: false };
  }),
  on(CashFlowActions.setIncomesFilter, (state, { categoryIds }): State => {
    return { ...state, isLoading: false, incomesFilter: categoryIds };
  }),
  on(CashFlowActions.setExpensesFilter, (state, { categoryIds }): State => {
    return { ...state, isLoading: false, expensesFilter: categoryIds };
  }),
  on(AuthActions.signOut, (): State => {
    return { incomes: [], expenses: [], incomesFilter: [], expensesFilter: [], isLoading: false };
  })
);
