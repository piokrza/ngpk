import { createFeatureSelector, createSelector } from '@ngrx/store';

import { User } from '#pages/auth/models';
import { FeatureKey, State as AuthState } from '#store/auth';

const AuthStateSelector = createFeatureSelector<AuthState>(FeatureKey);

export const user = createSelector(AuthStateSelector, ({ user }: AuthState): User | null => user);
export const errorMessage = createSelector(AuthStateSelector, ({ errorMessage }: AuthState): string | null => errorMessage);
