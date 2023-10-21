import firebase from 'firebase/compat';

import { User } from '#common/models/user.model';

export const setUser = (user: firebase.User): User => ({
  displayName: user.displayName,
  email: user.email,
  emailVerified: user.emailVerified,
  phoneNumber: user.phoneNumber,
  photoURL: user.photoURL,
  refreshToken: user.refreshToken,
  uid: user.uid,
});
