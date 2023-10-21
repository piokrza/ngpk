import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { User } from '@common/models/user.model';
import { Store } from '@ngrx/store';
import { AccountSettingsFormComponent } from '@settings/components/account-settings-form/account-settings-form.component';
import { DestroyComponent } from '@shared/components/destroy/destroy.component';
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
  private store: Store = inject(Store);
  private dialogService: DialogService = inject(DialogService);

  public user$: Observable<User> = this.store.select(AuthSelectors.user);
  private _user!: User;

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
