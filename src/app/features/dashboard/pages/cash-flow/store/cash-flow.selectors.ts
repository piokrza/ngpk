import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CashFlow } from '#cash-flow/models';
import { State as CashFlowState, FeatureKey } from '#cash-flow/store';

const CashFlowStateSelector = createFeatureSelector<CashFlowState>(FeatureKey);

export const isLoading = createSelector(CashFlowStateSelector, ({ isLoading }: CashFlowState): boolean => isLoading);
export const cashFlow = createSelector(CashFlowStateSelector, ({ cashFlow }: CashFlowState): CashFlow[] => cashFlow);
export const incomes = createSelector(CashFlowStateSelector, ({ cashFlow, incomesFilter }: CashFlowState): CashFlow[] => {
  return cashFlow
    .filter((cashFlow) => cashFlow.type === 'income')
    .filter((income) => (incomesFilter.length ? incomesFilter.includes(income.categoryId) : income));
});
export const expenses = createSelector(CashFlowStateSelector, ({ cashFlow, expensesFilter }: CashFlowState): CashFlow[] => {
  return cashFlow
    .filter((cashFlow) => cashFlow.type === 'expense')
    .filter((expense) => (expensesFilter.length ? expensesFilter.includes(expense.categoryId) : expense));
});
export const incomesFilter = createSelector(CashFlowStateSelector, ({ incomesFilter }: CashFlowState): string[] => incomesFilter);
export const expensesFilter = createSelector(CashFlowStateSelector, ({ expensesFilter }: CashFlowState): string[] => expensesFilter);
export const totalIncomes = createSelector(CashFlowStateSelector, ({ cashFlow }: CashFlowState): number => {
  return cashFlow.filter((cf) => cf.type === 'income').reduce((acc: number, income: CashFlow): number => acc + income.amount, 0);
});
export const totalExpenses = createSelector(CashFlowStateSelector, ({ cashFlow }: CashFlowState): number => {
  return cashFlow.filter((cf) => cf.type === 'expense').reduce((acc: number, expense: CashFlow): number => acc + expense.amount, 0);
});
export const cashFlowById = (id: string) => {
  return createSelector(CashFlowStateSelector, ({ cashFlow }) => cashFlow.find((cashFlow) => cashFlow.id === id));
};
export const totalBalance = createSelector(totalIncomes, totalExpenses, (): number => Number(totalIncomes) - Number(totalExpenses));
