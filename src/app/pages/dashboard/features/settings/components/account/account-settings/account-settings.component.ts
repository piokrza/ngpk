import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { tap } from 'rxjs';

import { User } from '#auth/models';
import { BaseDialogStyles } from '#common/constants';
import { AccountSettingsFormComponent } from '#settings/components';
import { AuthActions, AuthSelectors } from '#store/auth';

@UntilDestroy()
@Component({
  selector: 'ctrl-account-settings',
  template: `
    <div class="container">
      <p>{{ 'settings.accountSettings' | translate }}</p>
      <button (click)="openAccountSettingsDialog()" [icon]="PrimeIcons.USER" pButton></button>
    </div>
  `,
  styleUrl: './account-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSettingsComponent implements OnInit {
  private readonly store: Store = inject(Store);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly transalteService: TranslateService = inject(TranslateService);

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  private user: User | null = null;

  public ngOnInit(): void {
    this.store
      .select(AuthSelectors.user)
      .pipe(
        tap((user: User | null) => (this.user = user)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  public openAccountSettingsDialog(): void {
    const dialogRef: DynamicDialogRef = this.dialogService.open(AccountSettingsFormComponent, {
      header: this.transalteService.instant('settings.accountForm.title'),
      style: { ...BaseDialogStyles },
      data: this.user,
    });

    dialogRef.onClose
      .pipe(
        tap((updatedUserData?: User): void => {
          updatedUserData && this.store.dispatch(AuthActions.updateAccount({ updatedUserData }));
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
