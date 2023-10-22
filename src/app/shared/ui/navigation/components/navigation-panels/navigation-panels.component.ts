import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, MenuItem } from 'primeng/api';

import { MenuService } from '#common/services/menu.service';
import { AuthActions } from '#store/auth';

@Component({
  selector: 'ctrl-navigation-panels',
  templateUrl: './navigation-panels.component.html',
  styleUrls: ['./navigation-panels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationPanelsComponent {
  private store: Store = inject(Store);
  private confirmationService: ConfirmationService = inject(ConfirmationService);

  public menuLinks: MenuItem[] = inject(MenuService).getMenuLinks();

  public signOut(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to signout?',
      header: 'Signout',
      accept: (): void => this.store.dispatch(AuthActions.signOut()),
    });
  }
}
