import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';

import { IUser } from '#auth/models';
import { MenuService } from '#common/services';
import { AuthSelectors } from '#store/auth';

@Component({
  selector: 'org-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  readonly user$: Observable<IUser | null> = inject(Store).select(AuthSelectors.user);

  menuLinks: MenuItem[] = inject(MenuService).getMenuLinks();
}
