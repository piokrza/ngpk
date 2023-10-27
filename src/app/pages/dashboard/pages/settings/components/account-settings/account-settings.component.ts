import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, tap } from 'rxjs';

import { User } from '#common/models';
import { AccountSettingsFormComponent } from '#pages/dashboard/pages/settings/components';
import { AuthActions, AuthSelectors } from '#store/auth';

@UntilDestroy()
@Component({
  selector: 'ctrl-account-settings',
  template: `
    <div class="container">
      <p>{{ 'settings.accountSettings' | translate }}</p>
      <button (click)="openAccountSettingsDialog()" icon="pi pi-user" pButton></button>
    </div>
  `,
  styleUrls: ['./account-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSettingsComponent implements OnInit {
  private readonly store: Store = inject(Store);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly transalteService: TranslateService = inject(TranslateService);

  public readonly user$: Observable<User> = this.store.select(AuthSelectors.user);
  private user!: User;

  public ngOnInit(): void {
    this.user$
      .pipe(
        tap((user: User) => (this.user = user)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  public openAccountSettingsDialog(): void {
    const dialogRef: DynamicDialogRef = this.dialogService.open(AccountSettingsFormComponent, {
      header: this.transalteService.instant('settings.accountForm.title'),
      style: { width: '90%', maxWidth: '600px' },
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
