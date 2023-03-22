import { FeatureKey, State as IncomesState } from '@app/store/cash-flow';
import { CashFlow } from '@common/models/cash-flow.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const IncomesStateSelector = createFeatureSelector<IncomesState>(FeatureKey);

export const isLoading = createSelector(IncomesStateSelector, ({ isLoading }: IncomesState): boolean => isLoading);
export const incomes = createSelector(IncomesStateSelector, ({ incomes }: IncomesState): CashFlow[] => incomes);
