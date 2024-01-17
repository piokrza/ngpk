import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CashFlow } from '#cash-flow/models';
import { State as CashFlowState, FeatureKey } from '#store/cash-flow';

const CashFlowStateSelector = createFeatureSelector<CashFlowState>(FeatureKey);

export const isLoading = createSelector(CashFlowStateSelector, ({ isLoading }: CashFlowState): boolean => isLoading);

export const incomes = createSelector(CashFlowStateSelector, ({ incomes, incomesFilter }: CashFlowState): CashFlow[] => {
  return !incomesFilter.length ? incomes : incomes.filter((income) => incomesFilter.includes(income.categoryId));
});

export const expenses = createSelector(CashFlowStateSelector, ({ expenses, expensesFilter }: CashFlowState): CashFlow[] => {
  return !expensesFilter.length ? expenses : expenses.filter((expense) => expensesFilter.includes(expense.categoryId));
});

export const incomesFilter = createSelector(CashFlowStateSelector, ({ incomesFilter }: CashFlowState): string[] => incomesFilter);

export const expensesFilter = createSelector(CashFlowStateSelector, ({ expensesFilter }: CashFlowState): string[] => expensesFilter);

export const totalIncomes = createSelector(CashFlowStateSelector, ({ incomes }: CashFlowState): number => {
  return incomes.reduce((acc: number, income: CashFlow): number => acc + income.amount, 0);
});

export const totalExpenses = createSelector(CashFlowStateSelector, ({ expenses }: CashFlowState): number => {
  return expenses.reduce((acc: number, expense: CashFlow): number => acc + expense.amount, 0);
});

export const totalBalance = createSelector(totalIncomes, totalExpenses, (): number => Number(totalIncomes) - Number(totalExpenses));
