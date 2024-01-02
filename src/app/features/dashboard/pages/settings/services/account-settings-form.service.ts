import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AccountSettingsForm } from '#settings/models';

@Injectable()
export class AccountSettingsFormService {
  get form(): FormGroup<AccountSettingsForm> {
    return new FormGroup<AccountSettingsForm>({
      displayName: new FormControl<string | null>(null),
      email: new FormControl<string | null>({ value: null, disabled: true }, { validators: [Validators.required] }),
      phoneNumber: new FormControl<string | null>(null),
      photoURL: new FormControl<string | null>(null),
    });
  }
}
