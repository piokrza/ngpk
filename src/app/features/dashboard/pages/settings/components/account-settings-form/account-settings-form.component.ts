import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';

import { PrimeIcons } from 'primeng/api';

import { IUser } from '#auth/models';
import { AuthActions, AuthSelectors } from '#auth/store';
import { AccountSettingsForm } from '#settings/models';

@Component({
  selector: 'org-account-settings-form',
  templateUrl: './account-settings-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSettingsFormComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly location = inject(Location);
  private readonly destroyRef = inject(DestroyRef);

  private user!: IUser;
  readonly trPath: string = 'settings.accountForm.';
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly form: FormGroup<AccountSettingsForm> = this.accountSettingsForm;

  ngOnInit(): void {
    this.store
      .select(AuthSelectors.user)
      .pipe(
        filter(Boolean),
        tap((user: IUser) => {
          this.user = user;
          this.form.patchValue({
            email: this.user.email,
            photoURL: this.user.photoURL,
            displayName: this.user.displayName,
            phoneNumber: this.user.phoneNumber,
          });
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  onSubmit(): void {
    const updatedUserData = {
      ...this.form.getRawValue(),
      uid: this.user.uid,
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
