import { FeatureKey, State as CashFlowState } from '@store/cash-flow';
import { CashFlow } from '@common/models/cash-flow.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const CashFlowStateSelector = createFeatureSelector<CashFlowState>(FeatureKey);

export const isLoading = createSelector(CashFlowStateSelector, ({ isLoading }: CashFlowState): boolean => isLoading);
export const incomes = createSelector(CashFlowStateSelector, ({ incomes }: CashFlowState): CashFlow[] => incomes);
export const expenses = createSelector(CashFlowStateSelector, ({ expenses }: CashFlowState): CashFlow[] => expenses);

export const totalIncomes = createSelector(CashFlowStateSelector, ({ incomes }: CashFlowState): number => {
  const totalIncomes: number = incomes.reduce((acc: number, income: CashFlow) => {
    return acc + Number(income.amount);
  }, 0);

  return totalIncomes;
});

export const totalExpenses = createSelector(CashFlowStateSelector, ({ expenses }: CashFlowState): number => {
  const totalExpenses: number = expenses.reduce((acc: number, expense: CashFlow) => {
    return acc + Number(expense.amount);
  }, 0);

  return totalExpenses;
});