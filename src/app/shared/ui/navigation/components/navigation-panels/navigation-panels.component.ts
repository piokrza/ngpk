import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';

import { User } from '#common/models';
import { MenuService } from '#common/services';
import { AuthSelectors } from '#store/auth';

@Component({
  selector: 'ctrl-navigation-panels',
  templateUrl: './navigation-panels.component.html',
  styleUrls: ['./navigation-panels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationPanelsComponent {
  public readonly isUser$: Observable<User> = inject(Store).select(AuthSelectors.user);

  public menuLinks: MenuItem[] = inject(MenuService).getMenuLinks();
}
