import { createAction, props } from '@ngrx/store';

import { AuthFormPayload, IUser } from '@ngpk/organizer/model';
import { ActionTypes } from '@ngpk/organizer/state/auth/action-types';

export const userAuthenticated = createAction(ActionTypes.USER_AUTHENTICATED, props<{ user: IUser }>());
export const userNotAuthenticated = createAction(ActionTypes.USER_NOT_AUTHENTICATED);

export const signInWithGoogle = createAction(ActionTypes.SIGN_IN_WITH_GOOGLE);
export const signInWithGoogleSuccess = createAction(ActionTypes.SIGN_IN_WITH_GOOGLE_SUCCESS, props<{ user: Partial<IUser> }>());

export const signOut = createAction(ActionTypes.SIGN_OUT);

export const signInWithEmailAndPassword = createAction(ActionTypes.SIGN_IN_WITH_EMAIL_AND_PASSWORD, props<{ payload: AuthFormPayload }>());
export const signInWithEmailAndPasswordSuccess = createAction(ActionTypes.SIGN_IN_WITH_EMAIL_AND_PASSWORD_SUCCESS);
export const signInWithEmailAndPasswordFailure = createAction(
  ActionTypes.SIGN_IN_WITH_EMAIL_AND_PASSWORD_FAILURE,
  props<{ errorMessage: string }>()
);

export const signUpWithEmailAndPassword = createAction(ActionTypes.SIGN_UP_WITH_EMAIL_AND_PASSWORD, props<{ payload: AuthFormPayload }>());
export const signUpWithEmailAndPasswordSuccess = createAction(
  ActionTypes.SIGN_UP_WITH_EMAIL_AND_PASSWORD_SUCCESS,
  props<{ user: Partial<IUser> }>()
);
export const signUpWithEmailAndPasswordFailure = createAction(
  ActionTypes.SIGN_UP_WITH_EMAIL_AND_PASSWORD_FAILURE,
  props<{ errorMessage: string }>()
);

export const loadUserData = createAction(ActionTypes.LOAD_USER_DATA, props<{ uid: string }>());
export const loadUserDataSuccess = createAction(ActionTypes.LOAD_USER_DATA_SUCCESS, props<{ user: IUser }>());
export const loadUserDataFailure = createAction(ActionTypes.LOAD_USER_DATA_FAILURE);

export const updateAccount = createAction(ActionTypes.UPDATE_ACCOUNT, props<{ updatedUserData: IUser }>());
export const updateAccountSuccess = createAction(ActionTypes.UPDATE_ACCOUNT_SUCCESS);
export const updateAccountFailure = createAction(ActionTypes.UPDATE_ACCOUNT_FAILURE);

export const resetErrorMessage = createAction(ActionTypes.RESET_ERROR_MESSAGE);
