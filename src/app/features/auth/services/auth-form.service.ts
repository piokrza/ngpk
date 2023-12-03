import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginForm, RegisterForm } from '#auth/models';
import { passwordMatchValidator } from '#auth/validators';

@Injectable()
export class AuthFormService {
  public get registerForm(): FormGroup<RegisterForm> {
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

  public get loginForm(): FormGroup<LoginForm> {
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
