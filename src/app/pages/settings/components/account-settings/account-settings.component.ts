import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { User } from '@common/models';
import { Store } from '@ngrx/store';
import { AccountSettingsFormComponent } from '@pages/settings/components';
import { DestroyComponent } from '@shared/components/destroy';
import { AuthActions, AuthSelectors } from '@store/auth';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'ctrl-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSettingsComponent extends DestroyComponent implements OnInit {
  private readonly store: Store = inject(Store);
  private readonly dialogService: DialogService = inject(DialogService);

  public readonly user$: Observable<User> = this.store.select(AuthSelectors.user);
  private _user!: User; // remove dashes

  public ngOnInit(): void {
    this.user$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (user: User): User => (this._user = user),
    });
  }

  public openAccountSettingsDialog(): void {
    const dialogRef: DynamicDialogRef = this.dialogService.open(AccountSettingsFormComponent, {
      header: 'Update account',
      style: { width: '90%', maxWidth: '600px' },
      data: this._user,
    });

    dialogRef.onClose.pipe(takeUntil(this.destroy$)).subscribe({
      next: (updatedUserData: User) => {
        updatedUserData && this.store.dispatch(AuthActions.updateAccount({ updatedUserData }));
      },
    });
  }
}
