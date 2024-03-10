import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IUser } from '@ngpk/auth-organizer/model';
import { FeatureKey, State as AuthState } from '@ngpk/auth-organizer/state';

const AuthStateSelector = createFeatureSelector<AuthState>(FeatureKey);

export const user = createSelector(AuthStateSelector, ({ user }: AuthState): IUser | null => user);
export const errorMessage = createSelector(AuthStateSelector, ({ errorMessage }: AuthState): string | null => errorMessage);
