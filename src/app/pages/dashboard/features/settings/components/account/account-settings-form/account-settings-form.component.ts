import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { IUser } from '#auth/models';
import { AccountSettingsForm } from '#settings/models';
import { AccountSettingsFormService } from '#settings/services/account-settings-form.service';

@Component({
  selector: 'ctrl-account-settings-form',
  templateUrl: './account-settings-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AccountSettingsFormService],
})
export class AccountSettingsFormComponent implements OnInit {
  private readonly dialogRef: DynamicDialogRef = inject(DynamicDialogRef);

  private readonly userData: IUser = inject(DynamicDialogConfig).data;
  public readonly form: FormGroup<AccountSettingsForm> = inject(AccountSettingsFormService).form;

  public readonly trPath: string = 'settings.accountForm.';

  public ngOnInit(): void {
    this.userData && this.patchAccountFormValues();
  }

  private patchAccountFormValues(): void {
    const { displayName, email, phoneNumber, photoURL } = this.userData;

    this.form.patchValue({ displayName, email, phoneNumber, photoURL });
  }

  public onSubmit(): void {
    const controls: AccountSettingsForm = this.form.controls;

    this.dialogRef.close({
      displayName: controls.displayName.value,
      email: controls.email.value,
      phoneNumber: controls.phoneNumber.value,
      photoURL: controls.photoURL.value,
      refreshToken: this.userData.refreshToken,
      emailVerified: this.userData.emailVerified,
      uid: this.userData.uid,
    });
  }
}
