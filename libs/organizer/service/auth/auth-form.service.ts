import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { passwordMatchValidator } from '@ngpk/core/validator';
import { LoginForm, RegisterForm } from '@ngpk/organizer/model';

@Injectable()
export class AuthFormService {
  get registerForm(): FormGroup<RegisterForm> {
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

  get loginForm(): FormGroup<LoginForm> {
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
