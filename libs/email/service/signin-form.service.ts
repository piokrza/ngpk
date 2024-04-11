import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import { FormService } from '@ngpk/email/service';

@Injectable()
export class SigninFormService extends FormService {
  constructor() {
    super();
  }

  get config() {
    return {
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    };
  }
}
