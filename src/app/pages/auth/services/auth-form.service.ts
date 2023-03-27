import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from '@auth/models/login-form.model';
import { RegisterForm } from '@auth/models/register-form.model';
import { passwordMatchValidator } from '@auth/validators/password-match';

@Injectable()
export class AuthFormService {
  private fb: FormBuilder = inject(FormBuilder);

  public createRegisterForm(): FormGroup<RegisterForm> {
    return this.fb.group<RegisterForm>(
      {
        email: this.fb.nonNullable.control('', { validators: [Validators.required, Validators.email] }),
        password: this.fb.nonNullable.control('', { validators: [Validators.required, Validators.minLength(6)] }),
        passwordConfirmation: this.fb.nonNullable.control('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      {
        validators: [passwordMatchValidator('password', 'passwordConfirmation')],
      }
    );
  }

  public createLoginForm(): FormGroup<LoginForm> {
    return this.fb.group<LoginForm>({
      email: this.fb.nonNullable.control('', { validators: [Validators.required, Validators.email] }),
      password: this.fb.nonNullable.control('', { validators: [Validators.required] }),
    });
  }
}
