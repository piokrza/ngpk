import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import { FormBase } from '@ngpk/core/abstract';

@Injectable()
export class SigninFormService extends FormBase {
  get config() {
    return {
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    };
  }
}
