export enum ActionTypes {
  SIGN_IN_WITH_GOOGLE = '[Auth] Sign in with Google',
  SIGN_IN_WITH_GOOGLE_SUCCESS = '[Auth] Sign in with Google success',
  SIGN_IN_WITH_GOOGLE_FAILURE = '[Auth] Sign in with Google failure',

  SIGN_OUT = '[Auth] Sign out',

  SIGN_IN_WITH_EMAIL_AND_PASSWORD = '[Auth] Sign in with email and password',
  SIGN_IN_WITH_EMAIL_AND_PASSWORD_SUCCESS = '[Auth] Sign in with email and password success',
  SIGN_IN_WITH_EMAIL_AND_PASSWORD_FAILURE = '[Auth] Sign in with email and password failure',

  SIGN_UP_WITH_EMAIL_AND_PASSWORD = '[Auth] Sign up with email and password',
  SIGN_UP_WITH_EMAIL_AND_PASSWORD_SUCCESS = '[Auth] Sign up with email and password success',
  SIGN_UP_WITH_EMAIL_AND_PASSWORD_FAILURE = '[Auth] Sign up with email and password failure',
}
