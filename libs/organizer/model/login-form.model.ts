import { RegisterForm } from '@ngpk/organizer/model';

export type LoginForm = Omit<RegisterForm, 'passwordConfirmation'>;
