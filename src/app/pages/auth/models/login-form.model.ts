import { RegisterForm } from '@auth/models/register-form.model';

export type LoginForm = Omit<RegisterForm, 'passwordConfirmation'>;
