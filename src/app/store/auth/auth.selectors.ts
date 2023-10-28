import { createFeatureSelector, createSelector } from '@ngrx/store';

import { User } from '#common/models/user.model';
import { FeatureKey, State as AuthState } from '#store/auth';

const AuthStateSelector = createFeatureSelector<AuthState>(FeatureKey);

export const user = createSelector(AuthStateSelector, ({ user }: AuthState): User | null => user);
