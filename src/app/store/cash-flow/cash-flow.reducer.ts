import { CashFlow } from '@features/cash-flow/models/cash-flow.model';
import { createReducer, on } from '@ngrx/store';
import { CashFlowActions } from '@store/cash-flow';

export const FeatureKey = 'incomes';

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

  // get user cash flow data
  on(CashFlowActions.getCashFlowUserData, (state) => {
    return { ...state, isLoading: true };
  }),
  on(CashFlowActions.getCashFlowUserDataSuccess, (state, { cashFlowData: { expenses, incomes } }) => {
    return { expenses, incomes, isLoading: false };
  }),
  on(CashFlowActions.getCashFlowUserDataFailure, (state) => {
    return { ...state, isLoading: false };
  }),

  // add income
  on(CashFlowActions.addIncome, (state, { income }): State => {
    return { ...state, incomes: [...state.incomes, income] };
  }),

  // remove income
  on(CashFlowActions.removeIncome, (state, { incomeId }): State => {
    const filteredIncomes: CashFlow[] = state.incomes.filter((income: CashFlow): boolean => income.id !== incomeId);
    return { ...state, incomes: filteredIncomes };
  }),

  // add expense
  on(CashFlowActions.addExpense, (state, { expense }): State => {
    return { ...state, expenses: [...state.expenses, expense] };
  }),

  // remove expense
  on(CashFlowActions.removeExpense, (state, { expenseId }): State => {
    const filteredExpenses: CashFlow[] = state.expenses.filter(
      (expense: CashFlow): boolean => expense.id !== expenseId
    );
    return { ...state, expenses: filteredExpenses };
  })
);
