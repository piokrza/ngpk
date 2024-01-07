import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';

import { PrimeIcons } from 'primeng/api';

import { IUser } from '#auth/models';
import { AccountSettingsForm } from '#settings/models';
import { AuthActions, AuthSelectors } from '#store/auth';

@UntilDestroy()
@Component({
  selector: 'org-account-settings-form',
  templateUrl: './account-settings-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSettingsFormComponent implements OnInit {
  readonly #store = inject(Store);
  readonly #location = inject(Location);

  #user!: IUser;
  readonly trPath: string = 'settings.accountForm.';
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly form: FormGroup<AccountSettingsForm> = this.accountSettingsForm;

  public ngOnInit(): void {
    this.#store
      .select(AuthSelectors.user)
      .pipe(
        filter(Boolean),
        tap((user: IUser) => {
          this.#user = user;
          this.form.patchValue({
            email: this.#user.email,
            photoURL: this.#user.photoURL,
            displayName: this.#user.displayName,
            phoneNumber: this.#user.phoneNumber,
          });
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  public onSubmit(): void {
    this.#store.dispatch(
      AuthActions.updateAccount({
        updatedUserData: {
          ...this.form.getRawValue(),
          uid: this.#user.uid,
          config: this.#user.config,
        },
      })
    );
  }

  public navigateBack(): void {
    this.#location.back();
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
