import { RegisterForm } from '@pages/auth/models';

export type LoginForm = Omit<RegisterForm, 'passwordConfirmation'>;
