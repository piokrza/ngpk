import { AuthFormPayload } from '@auth/models/auth-form-payload.model';
import { User } from '@common/models/user.model';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@store/auth/action-types';

export const userAuthenticated = createAction(ActionTypes.USER_AUTHENTICATED, props<{ user: User }>());
export const userNotAuthenticated = createAction(ActionTypes.USER_NOT_AUTHENTICATED);

export const signInWithGoogle = createAction(ActionTypes.SIGN_IN_WITH_GOOGLE);

export const signOut = createAction(ActionTypes.SIGN_OUT);

export const signInWithEmailAndPassword = createAction(
  ActionTypes.SIGN_IN_WITH_EMAIL_AND_PASSWORD,
  props<{ payload: AuthFormPayload }>()
);

export const signUpWithEmailAndPassword = createAction(
  ActionTypes.SIGN_UP_WITH_EMAIL_AND_PASSWORD,
  props<{ payload: AuthFormPayload }>()
);

export const loadUserData = createAction(ActionTypes.LOAD_USER);
