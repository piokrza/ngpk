import { Injectable } from '@angular/core';
import { ValidationErrors, Validator, FormGroup } from '@angular/forms';

import { SignupForm } from '@ngpk/email/model';

@Injectable()
export class MatchPassword implements Validator {
  validate(formGroup: FormGroup<SignupForm>): ValidationErrors | null {
    const { password, passwordConfirmation } = formGroup.value;

    if (password === passwordConfirmation) {
      return null;
    }

    return { passwordsDontMatch: true };
  }
}
