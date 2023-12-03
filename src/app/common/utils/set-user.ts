import firebase from 'firebase/compat';

import { IUser } from '#auth/models';

export const setUser = (user: firebase.User): IUser => ({
  displayName: user.displayName,
  email: user.email,
  emailVerified: user.emailVerified,
  phoneNumber: user.phoneNumber,
  photoURL: user.photoURL,
  refreshToken: user.refreshToken,
  uid: user.uid,
});
