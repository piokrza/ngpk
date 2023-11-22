import { RegisterForm } from '#auth/models';

export type LoginForm = Omit<RegisterForm, 'passwordConfirmation'>;
