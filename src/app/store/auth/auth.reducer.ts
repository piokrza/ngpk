import { createReducer, on } from '@ngrx/store';

import { User } from '#auth/models';
import { AuthActions } from '#store/auth';

export const FeatureKey = 'auth';

export interface State {
  user: User | null;
  errorMessage: string | null;
}

const initialState: State = {
  user: null,
  errorMessage: null,
};

export const Reducer = createReducer(
  initialState,

  // firebase authentication errors
  on(AuthActions.signInWithEmailAndPasswordFailure, (state, { errorMessage }) => {
    return { ...state, errorMessage };
  }),

  on(AuthActions.signUpWithEmailAndPasswordFailure, (state, { errorMessage }) => {
    return { ...state, errorMessage };
  }),

  // user authenticated
  on(AuthActions.userAuthenticated, (state, { user }): State => {
    return { ...state, user };
  }),
  on(AuthActions.userNotAuthenticated, (state): State => {
    return { ...state, user: null };
  }),

  // reset errorMessage
  on(AuthActions.resetErrorMessage, (state): State => ({ ...state, errorMessage: null }))
);
