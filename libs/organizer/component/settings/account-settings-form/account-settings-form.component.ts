import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

import { IUser, AccountSettingsForm } from '@ngpk/organizer/model';
import { AuthActions, AuthSelectors } from '@ngpk/organizer/state/auth';

const imports = [ButtonModule, ReactiveFormsModule, TranslateModule, InputNumberModule, InputTextModule];

@Component({
  selector: 'ngpk-account-settings-form',
  templateUrl: './account-settings-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class AccountSettingsFormComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly location = inject(Location);

  private readonly user = toSignal(this.store.select(AuthSelectors.user));

  readonly trPath = 'settings.accountForm.';
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly form: FormGroup<AccountSettingsForm> = this.accountSettingsForm;

  ngOnInit(): void {
    if (this.user()) {
      this.form.patchValue({
        email: this.user()?.email,
        photoURL: this.user()?.photoURL,
        displayName: this.user()?.displayName,
        phoneNumber: this.user()?.phoneNumber,
      });
    }
  }

  onSubmit(): void {
    const updatedUserData = {
      ...this.form.getRawValue(),
      uid: this.user()?.uid ?? '',
    } satisfies IUser;

    this.store.dispatch(AuthActions.updateAccount({ updatedUserData }));
  }

  navigateBack(): void {
    this.location.back();
  }

  private get accountSettingsForm(): FormGroup<AccountSettingsForm> {
    return new FormGroup<AccountSettingsForm>({
      displayName: new FormControl<string>(''),
      email: new FormControl<string>({ value: '', disabled: true }, { validators: [Validators.required] }),
      phoneNumber: new FormControl<string>(''),
      photoURL: new FormControl<string>(''),
    });
  }
}
