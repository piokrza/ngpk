import { createReducer, on } from '@ngrx/store';

import { CashFlow } from '#features/cash-flow/models';
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

  // get user cash flow data
  on(CashFlowActions.getCashFlowUserData, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(CashFlowActions.getCashFlowUserDataSuccess, (_, { cashFlowData: { expenses, incomes } }): State => {
    return { expenses, incomes, isLoading: false };
  }),
  on(CashFlowActions.getCashFlowUserDataFailure, (state): State => {
    return { ...state, isLoading: false };
  }),

  // add income
  on(CashFlowActions.addIncome, (state, { income }): State => {
    return { ...state, incomes: [...state.incomes, income] };
  }),
  on(CashFlowActions.addIncomeSuccess, (state): State => {
    return { ...state };
  }),
  on(CashFlowActions.addIncomeFailure, (state): State => {
    return { ...state };
  }),

  // update income
  on(CashFlowActions.updateIncome, (state, { updatedIncome }): State => {
    const incomes: CashFlow[] = state.incomes.map((income: CashFlow) => {
      return income.id === updatedIncome.id ? updatedIncome : income;
    });

    return { ...state, incomes };
  }),
  on(CashFlowActions.updateIncomeSuccess, (state): State => {
    return { ...state };
  }),
  on(CashFlowActions.updateIncomeFailure, (state): State => {
    return { ...state };
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
  on(CashFlowActions.addExpenseSuccess, (state): State => {
    return { ...state };
  }),
  on(CashFlowActions.addExpenseFailure, (state): State => {
    return { ...state };
  }),

  // remove expense
  on(CashFlowActions.removeExpense, (state, { expenseId }): State => {
    const filteredExpenses: CashFlow[] = state.expenses.filter((expense: CashFlow): boolean => expense.id !== expenseId);
    return { ...state, expenses: filteredExpenses };
  }),

  // update expense
  on(CashFlowActions.updateExpense, (state, { updatedExpense }): State => {
    const expenses: CashFlow[] = state.expenses.map((expense: CashFlow) => {
      return expense.id === updatedExpense.id ? updatedExpense : expense;
    });

    return { ...state, expenses };
  }),
  on(CashFlowActions.updateExpenseSuccess, (state): State => {
    return { ...state };
  }),
  on(CashFlowActions.updateExpenseFailure, (state): State => {
    return { ...state };
  }),

  // on signout
  on(AuthActions.signOut, (): State => {
    return { incomes: [], expenses: [], isLoading: false };
  })
);
