import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import { FormBase } from '@ngpk/core/abstract';
import { UniqueUsername, MatchPassword } from '@ngpk/email/validator';

@Injectable()
export class SignupFormService extends FormBase {
  constructor(
    private readonly matchPassword: MatchPassword,
    private readonly uniqueUsername: UniqueUsername
  ) {
    super();
  }

  get config() {
    return {
      username: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-z0-9]+$/)],
        [this.uniqueUsername.validate],
      ],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), this.matchPassword.validate]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), this.matchPassword.validate]],
    };
  }

  override customValidators = { validators: [this.matchPassword.validate] };
}
