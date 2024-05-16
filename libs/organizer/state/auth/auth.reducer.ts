import { createReducer, on } from '@ngrx/store';

import { IUser } from '@ngpk/organizer/model';
import { AuthActions } from '@ngpk/organizer/state/auth';

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
  on(AuthActions.loadUserDataSuccess, (state, { user }) => {
    return { ...state, user };
  }),
  on(AuthActions.userAuthenticated, (state, { user }): State => {
    return { ...state, user };
  }),
  on(AuthActions.userNotAuthenticated, (state): State => {
    return { ...state, user: null };
  }),
  on(AuthActions.resetErrorMessage, (state): State => ({ ...state, errorMessage: null }))
);
