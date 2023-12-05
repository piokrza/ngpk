import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CashFlow } from '#cash-flow/models';
import { FeatureKey, State as CashFlowState } from '#store/cash-flow';

const CashFlowStateSelector = createFeatureSelector<CashFlowState>(FeatureKey);

export const isLoading = createSelector(CashFlowStateSelector, ({ isLoading }: CashFlowState): boolean => isLoading);
export const incomes = createSelector(CashFlowStateSelector, ({ incomes }: CashFlowState): CashFlow[] => incomes);
export const expenses = createSelector(CashFlowStateSelector, ({ expenses }: CashFlowState): CashFlow[] => expenses);

export const totalIncomes = createSelector(CashFlowStateSelector, ({ incomes }: CashFlowState): number => {
  return incomes.reduce((acc: number, income: CashFlow): number => acc + income.amount, 0);
});

export const totalExpenses = createSelector(CashFlowStateSelector, ({ expenses }: CashFlowState): number => {
  return expenses.reduce((acc: number, expense: CashFlow): number => acc + expense.amount, 0);
});

export const totalBalance = createSelector(totalIncomes, totalExpenses, (): number => Number(totalIncomes) - Number(totalExpenses));
