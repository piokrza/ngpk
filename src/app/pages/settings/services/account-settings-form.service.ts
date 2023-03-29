import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountSettingsForm } from '@settings/models/account-settings-form.model';

@Injectable({
  providedIn: 'root',
})
export class AccountSettingsFormService {
  private fb: FormBuilder = inject(FormBuilder);

  public createUserSettingsForm(): FormGroup<AccountSettingsForm> {
    return this.fb.group<AccountSettingsForm>({
      displayName: this.fb.control(''),
      email: this.fb.control(''),
      phoneNumber: this.fb.control(''),
      photoURL: this.fb.control(''),
    });
  }
}
