import { createReducer, on } from '@ngrx/store';

import { User } from '#common/models';
import { AuthActions } from '#store/auth';

export const FeatureKey = 'auth';

export interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export const Reducer = createReducer(
  initialState,

  // user authenticated
  on(AuthActions.userAuthenticated, (_, { user }): State => {
    return { user };
  }),
  on(AuthActions.userNotAuthenticated, (): State => {
    return { user: null };
  })
);
