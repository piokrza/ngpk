import { User } from '@common/models/user.model';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@store/auth/action-types';

export const signInWithGoogle = createAction(ActionTypes.SIGN_IN_WITH_GOOGLE);
export const signInWithGoogleSuccess = createAction(ActionTypes.SIGN_IN_WITH_GOOGLE_SUCCESS, props<{ user: User }>());
export const signInWithGoogleFailure = createAction(ActionTypes.SIGN_IN_WITH_GOOGLE_FAILURE);

export const signOut = createAction(ActionTypes.SIGN_OUT);
