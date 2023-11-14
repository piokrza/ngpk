import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AccountSettingsForm } from '#pages/dashboard/features/settings/models';

@Injectable({ providedIn: 'root' })
export class AccountSettingsFormService {
  public get userSettingsForm(): FormGroup<AccountSettingsForm> {
    return new FormGroup<AccountSettingsForm>({
      displayName: new FormControl<string | null>(null, { validators: [Validators.required] }),
      email: new FormControl<string | null>(null, { validators: [Validators.required] }),
      phoneNumber: new FormControl<string | null>(null, { validators: [Validators.required] }),
      photoURL: new FormControl<string | null>(null, { validators: [Validators.required] }),
    });
  }
}
