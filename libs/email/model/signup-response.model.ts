import { SignupKeys } from '@ngpk/email/enum';
import { SignupCredentials } from '@ngpk/email/model';

export type SignupResponse = Omit<SignupCredentials, SignupKeys.PASSWORD | SignupKeys.PASSWORD_CONFIRMATION>;
