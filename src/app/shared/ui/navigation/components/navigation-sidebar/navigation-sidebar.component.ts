import { ChangeDetectionStrategy, Component, inject, Input, TrackByFunction } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, MenuItem } from 'primeng/api';

import { trackByKey } from '#common/utils';
import { AuthActions } from '#store/auth';

@Component({
  selector: 'ctrl-navigation-sidebar',
  templateUrl: './navigation-sidebar.component.html',
  styleUrls: ['./navigation-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationSidebarComponent {
  private readonly store: Store = inject(Store);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);

  @Input() public menuLinks!: MenuItem[];

  public readonly trackByLabel: TrackByFunction<MenuItem> = trackByKey<MenuItem>('label');

  public signOut(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to signout?',
      header: 'Signout',
      accept: (): void => this.store.dispatch(AuthActions.signOut()),
    });
  }
}
