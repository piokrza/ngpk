import { User } from '#common/models/user.model';
import { createAction, props } from '@ngrx/store';
import { AuthFormPayload } from '#pages/auth/models';
import { ActionTypes } from '#store/auth/action-types';

// user authenticated
export const userAuthenticated = createAction(ActionTypes.USER_AUTHENTICATED, props<{ user: User }>());
export const userNotAuthenticated = createAction(ActionTypes.USER_NOT_AUTHENTICATED);

// sign in with google
export const signInWithGoogle = createAction(ActionTypes.SIGN_IN_WITH_GOOGLE);

// sign out
export const signOut = createAction(ActionTypes.SIGN_OUT);

// sign in with email and password
export const signInWithEmailAndPassword = createAction(
  ActionTypes.SIGN_IN_WITH_EMAIL_AND_PASSWORD,
  props<{ payload: AuthFormPayload }>()
);
export const signInWithEmailAndPasswordSuccess = createAction(ActionTypes.SIGN_IN_WITH_EMAIL_AND_PASSWORD_SUCCESS);
export const signInWithEmailAndPasswordFailure = createAction(ActionTypes.SIGN_IN_WITH_EMAIL_AND_PASSWORD_FAILURE);

// sign up with email and password
export const signUpWithEmailAndPassword = createAction(
  ActionTypes.SIGN_UP_WITH_EMAIL_AND_PASSWORD,
  props<{ payload: AuthFormPayload }>()
);
export const signUpWithEmailAndPasswordSuccess = createAction(ActionTypes.SIGN_UP_WITH_EMAIL_AND_PASSWORD_SUCCESS);
export const signUpWithEmailAndPasswordFailure = createAction(ActionTypes.SIGN_UP_WITH_EMAIL_AND_PASSWORD_FAILURE);

// load user data
export const loadUserData = createAction(ActionTypes.LOAD_USER_DATA);

// update account
export const updateAccount = createAction(ActionTypes.UPDATE_ACCOUNT, props<{ updatedUserData: User }>());
export const updateAccountSuccess = createAction(ActionTypes.UPDATE_ACCOUNT_SUCCESS);
export const updateAccountFailure = createAction(ActionTypes.UPDATE_ACCOUNT_FAILURE);
