import { UserConfig } from '#auth/models';

export interface IUser {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  uid: string;
  config: UserConfig;
  id?: string;
}
