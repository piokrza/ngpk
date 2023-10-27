import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginForm, RegisterForm } from '#pages/auth/models';
import { passwordMatchValidator } from '#pages/auth/validators';

@Injectable()
export class AuthFormService {
  public createRegisterForm(): FormGroup<RegisterForm> {
    return new FormGroup<RegisterForm>(
      {
        email: new FormControl<string>('', {
          validators: [Validators.required, Validators.email],
          nonNullable: true,
        }),
        password: new FormControl<string>('', {
          validators: [Validators.required, Validators.minLength(6)],
          nonNullable: true,
        }),
        passwordConfirmation: new FormControl<string>('', {
          validators: [Validators.required, Validators.minLength(6)],
          nonNullable: true,
        }),
      },
      {
        validators: [passwordMatchValidator('password', 'passwordConfirmation')],
      }
    );
  }

  public createLoginForm(): FormGroup<LoginForm> {
    return new FormGroup<LoginForm>({
      email: new FormControl<string>('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }
}
