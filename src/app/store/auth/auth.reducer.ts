import { createReducer, on } from '@ngrx/store';

import { User } from '#common/models/user.model';
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
  on(AuthActions.userAuthenticated, (state, { user }): State => {
    return { ...state, user };
  }),
  on(AuthActions.userNotAuthenticated, (): State => {
    return {
      user: {
        displayName: null,
        email: null,
        emailVerified: false,
        phoneNumber: null,
        photoURL: null,
        refreshToken: null,
        uid: '',
      },
    };
  })
);
