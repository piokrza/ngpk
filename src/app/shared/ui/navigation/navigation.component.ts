import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';

import { MenuService } from '#common/services';
import { User } from '#pages/auth/models';
import { AuthSelectors } from '#store/auth';

@Component({
  selector: 'ctrl-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  public readonly user$: Observable<User | null> = inject(Store).select(AuthSelectors.user);

  public menuLinks: MenuItem[] = inject(MenuService).getMenuLinks();
}
