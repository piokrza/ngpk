import { createReducer, on } from '@ngrx/store';

import { IUser } from '#auth/models';
import { AuthActions } from '#store/auth';

export const FeatureKey = 'auth';

export interface State {
  user: IUser | null;
  errorMessage: string | null;
}

const initialState: State = {
  user: null,
  errorMessage: null,
};

export const Reducer = createReducer(
  initialState,

  on(AuthActions.signInWithEmailAndPasswordFailure, (state, { errorMessage }) => {
    return { ...state, errorMessage };
  }),

  on(AuthActions.signUpWithEmailAndPasswordFailure, (state, { errorMessage }) => {
    return { ...state, errorMessage };
  }),

  on(AuthActions.userAuthenticated, (state, { user }): State => {
    return { ...state, user };
  }),
  on(AuthActions.userNotAuthenticated, (state): State => {
    return { ...state, user: null };
  }),

  on(AuthActions.resetErrorMessage, (state): State => ({ ...state, errorMessage: null }))
);
