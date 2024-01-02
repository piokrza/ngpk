import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IUser } from '#auth/models';
import { Category } from '#dashboard/pages/cash-flow/models';
import { FeatureKey, State as AuthState } from '#store/auth';

const AuthStateSelector = createFeatureSelector<AuthState>(FeatureKey);

export const user = createSelector(AuthStateSelector, ({ user }: AuthState): IUser | null => user);
export const errorMessage = createSelector(AuthStateSelector, ({ errorMessage }: AuthState): string | null => errorMessage);
export const categories = createSelector(AuthStateSelector, ({ user }): { incomes: Category[]; expenses: Category[] } => ({
  incomes: user?.config.categories.incomes ?? [],
  expenses: user?.config.categories.expenses ?? [],
}));
