import { RegisterForm } from '@ngpk/auth-organizer/model';

export type LoginForm = Omit<RegisterForm, 'passwordConfirmation'>;
