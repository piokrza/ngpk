import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AccountSettingsForm } from '#pages/dashboard/pages/settings/models';

@Injectable({ providedIn: 'root' })
export class AccountSettingsFormService {
  public createUserSettingsForm(): FormGroup<AccountSettingsForm> {
    return new FormGroup<AccountSettingsForm>({
      displayName: new FormControl<string | null>(null),
      email: new FormControl<string | null>(null),
      phoneNumber: new FormControl<string | null>(null),
      photoURL: new FormControl<string | null>(null),
    });
  }
}
