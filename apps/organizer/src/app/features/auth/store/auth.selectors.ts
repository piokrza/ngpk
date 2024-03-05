import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IUser } from '#auth/models';
import { FeatureKey, State as AuthState } from '#auth/store';

const AuthStateSelector = createFeatureSelector<AuthState>(FeatureKey);

export const user = createSelector(AuthStateSelector, ({ user }: AuthState): IUser | null => user);
export const errorMessage = createSelector(AuthStateSelector, ({ errorMessage }: AuthState): string | null => errorMessage);
