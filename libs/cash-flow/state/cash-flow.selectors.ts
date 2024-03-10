import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CashFlow, CashFlowType } from '@ngpk/cash-flow/model';
import { State as CashFlowState, FeatureKey } from '@ngpk/cash-flow/state';

const CashFlowStateSelector = createFeatureSelector<CashFlowState>(FeatureKey);

export const isLoading = createSelector(CashFlowStateSelector, ({ isLoading }: CashFlowState): boolean => isLoading);

export const cashFlow = (type?: CashFlowType) => {
  return createSelector(CashFlowStateSelector, ({ cashFlow }: CashFlowState): CashFlow[] => {
    return cashFlow.filter((item) => (type ? item.type === type : cashFlow));
  });
};

export const cashFlowById = (id: string) => {
  return createSelector(CashFlowStateSelector, ({ cashFlow }) => cashFlow.find((cashFlow) => cashFlow.id === id));
};

export const totalCashFlow = (type: CashFlowType) => {
  return createSelector(CashFlowStateSelector, ({ cashFlow }: CashFlowState): number => {
    return cashFlow.filter((item) => item.type === type).reduce((acc: number, income: CashFlow): number => acc + income.amount, 0);
  });
};

export const totalBalance = createSelector(
  totalCashFlow('income'),
  totalCashFlow('expense'),
  (): number => Number(totalCashFlow('income')) - Number(totalCashFlow('expense'))
);
