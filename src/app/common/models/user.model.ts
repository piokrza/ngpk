export interface User {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean | null;
  phoneNumber: string | null;
  photoURL: string | null;
  refreshToken: string | null;
  uid: string;
}
