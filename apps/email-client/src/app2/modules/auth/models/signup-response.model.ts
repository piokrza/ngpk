import { SignupCredentials } from '@auth/models';
import { SignupKeys } from '@auth/enums';

export type SignupResponse = Omit<SignupCredentials, SignupKeys.PASSWORD | SignupKeys.PASSWORD_CONFIRMATION>;
