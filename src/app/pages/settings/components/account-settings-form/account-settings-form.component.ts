import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '@common/models/user.model';
import { AccountSettingsForm } from '@settings/models/account-settings-form.model';
import { AccountSettingsFormService } from '@settings/services/account-settings-form.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'ctrl-account-settings-form',
  templateUrl: './account-settings-form.component.html',
  styleUrls: ['./account-settings-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSettingsFormComponent implements OnInit {
  public form: FormGroup<AccountSettingsForm> = inject(AccountSettingsFormService).createUserSettingsForm();
  private dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  private userData: User = inject(DynamicDialogConfig).data;

  public ngOnInit(): void {
    this.patchAccountFormValues();
  }

  private patchAccountFormValues(): void {
    const { displayName, email, phoneNumber, photoURL } = this.userData;

    this.form.patchValue({ displayName, email, phoneNumber, photoURL });
  }

  public onSubmit(): void {
    const { displayName, email, phoneNumber, photoURL } = this.form.getRawValue();

    console.log(this.userData);

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
