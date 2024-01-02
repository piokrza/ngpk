import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { IUser } from '#auth/models';
import { AccountSettingsForm } from '#settings/models';
import { AccountSettingsFormService } from '#settings/services/account-settings-form.service';

@Component({
  selector: 'org-account-settings-form',
  templateUrl: './account-settings-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AccountSettingsFormService],
})
export class AccountSettingsFormComponent implements OnInit {
  readonly #dialogRef: DynamicDialogRef = inject(DynamicDialogRef);

  readonly #userData: IUser = inject(DynamicDialogConfig).data;
  readonly form: FormGroup<AccountSettingsForm> = inject(AccountSettingsFormService).form;

  readonly trPath: string = 'settings.accountForm.';

  public ngOnInit(): void {
    this.form.patchValue({
      email: this.#userData.email,
      photoURL: this.#userData.photoURL,
      displayName: this.#userData.displayName,
      phoneNumber: this.#userData.phoneNumber,
    });
  }

  public onSubmit(): void {
    const controls: AccountSettingsForm = this.form.controls;

    this.#dialogRef.close({
      displayName: controls.displayName.value,
      email: controls.email.value,
      phoneNumber: controls.phoneNumber.value,
      photoURL: controls.photoURL.value,
      uid: this.#userData.uid,
    });
  }
}
