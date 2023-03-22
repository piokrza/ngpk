import { FeatureKey, State as CashFlowState } from '@store/cash-flow';
import { CashFlow } from '@common/models/cash-flow.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const CashFlowStateSelector = createFeatureSelector<CashFlowState>(FeatureKey);

export const isLoading = createSelector(CashFlowStateSelector, ({ isLoading }: CashFlowState): boolean => isLoading);
export const incomes = createSelector(CashFlowStateSelector, ({ incomes }: CashFlowState): CashFlow[] => incomes);
export const expenses = createSelector(CashFlowStateSelector, ({ expenses }: CashFlowState): CashFlow[] => expenses);
