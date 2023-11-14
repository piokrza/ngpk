import firebase from 'firebase/compat';

import { User } from '#pages/auth/models';

export const setUser = (user: firebase.User): User => ({
  displayName: user.displayName,
  email: user.email,
  emailVerified: user.emailVerified,
  phoneNumber: user.phoneNumber,
  photoURL: user.photoURL,
  refreshToken: user.refreshToken,
  uid: user.uid,
});
