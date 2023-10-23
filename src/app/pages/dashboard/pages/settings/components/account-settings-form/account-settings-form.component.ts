import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { User } from '#common/models';
import { AccountSettingsForm } from '#pages/dashboard/pages/settings/models';
import { AccountSettingsFormService } from '#pages/dashboard/pages/settings/services';

@Component({
  selector: 'ctrl-account-settings-form',
  templateUrl: './account-settings-form.component.html',
  styleUrls: ['./account-settings-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSettingsFormComponent implements OnInit {
  private readonly dialogRef: DynamicDialogRef = inject(DynamicDialogRef);

  private readonly userData: User = inject(DynamicDialogConfig).data;
  public form: FormGroup<AccountSettingsForm> = inject(AccountSettingsFormService).createUserSettingsForm();

  public ngOnInit(): void {
    this.userData && this.patchAccountFormValues();
  }

  private patchAccountFormValues(): void {
    const { displayName, email, phoneNumber, photoURL } = this.userData;

    this.form.patchValue({ displayName, email, phoneNumber, photoURL });
  }

  public onSubmit(): void {
    const { displayName, email, phoneNumber, photoURL } = this.form.getRawValue();

    this.dialogRef.close({
      displayName,
      email,
      phoneNumber,
      photoURL,
      refreshToken: this.userData.refreshToken,
      emailVerified: this.userData.emailVerified,
      uid: this.userData.uid,
    } as User);
  }
}
