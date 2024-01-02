import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AccountSettingsForm } from '#settings/models';

@Injectable()
export class AccountSettingsFormService {
  get form(): FormGroup<AccountSettingsForm> {
    return new FormGroup<AccountSettingsForm>({
      displayName: new FormControl<string>(''),
      email: new FormControl<string>({ value: '', disabled: true }, { validators: [Validators.required] }),
      phoneNumber: new FormControl<string>(''),
      photoURL: new FormControl<string>(''),
    });
  }
}
