import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { AuthActions } from '@store/auth';
import { Store } from '@ngrx/store';
import { ConfirmationService, MenuItem } from 'primeng/api';

@Component({
  selector: 'ctrl-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavSidebarComponent {
  @Input() public menuLinks!: MenuItem[];

  private store: Store = inject(Store);
  private confirmationService: ConfirmationService = inject(ConfirmationService);

  public signOut(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to signout?',
      header: 'Confirmation',
      accept: (): void => {
        this.store.dispatch(AuthActions.signOut());
      },
    });
  }
}
