import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Environment } from 'src/environments';

import { MenuItem, PrimeIcons } from 'primeng/api';

import { AuthSelectors } from '#app/features/auth/store';
import { AppPaths } from '#core/enums';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly store = inject(Store);
  private readonly environment = inject(Environment);

  get links$(): Observable<MenuItem[]> {
    return this.store.select(AuthSelectors.user).pipe(map(user => this.setMenuLinks(!!user)));
  }

  private setMenuLinks(isLoggedIn: boolean): MenuItem[] {
    return [
      {
        label: 'menu.home',
        routerLink: '',
        icon: PrimeIcons.FOLDER,
        visible: this.environment.featureFlags['home'],
        state: { isVisible: true },
      },
      {
        label: 'menu.tasker',
        routerLink: AppPaths.TASKER,
        icon: PrimeIcons.SIGN_IN,
        visible: this.environment.featureFlags['tasker'],
        state: { isVisible: isLoggedIn },
      },
      {
        label: 'menu.cashFlow',
        routerLink: AppPaths.CASH_FLOW,
        icon: PrimeIcons.SIGN_IN,
        visible: this.environment.featureFlags['cashFlow'],
        state: { isVisible: isLoggedIn },
      },
      {
        label: 'menu.drive',
        routerLink: AppPaths.DRIVE,
        icon: PrimeIcons.FOLDER,
        visible: this.environment.featureFlags['drive'],
        state: { isVisible: isLoggedIn },
      },
      {
        label: 'menu.settings',
        routerLink: AppPaths.SETTINGS,
        icon: PrimeIcons.SLIDERS_V,
        visible: this.environment.featureFlags['settings'],
        state: { isVisible: isLoggedIn },
      },
    ].filter(({ state: { isVisible } }) => isVisible);
  }
}
