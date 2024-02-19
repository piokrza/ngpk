import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Environment } from 'src/environments';

import { MenuItem, PrimeIcons } from 'primeng/api';

import { AuthSelectors } from '#app/features/auth/store';
import { AppPaths } from '#core/enums';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly store = inject(Store);
  private readonly environment = inject(Environment);

  get links$() {
    return this.store.select(AuthSelectors.user).pipe(map((user) => this.setMenuLinks(!!user)));
  }

  private setMenuLinks(isLoggedIn: boolean): MenuItem[] {
    return [
      {
        label: 'menu.home',
        routerLink: '',
        icon: PrimeIcons.FOLDER,
        state: { isLoggedIn: true },
      },
      {
        label: 'menu.drive',
        routerLink: AppPaths.DRIVE,
        icon: PrimeIcons.FOLDER,
        visible: this.environment.featureFlags['drive'],
        state: { isLoggedIn },
      },
      {
        label: 'menu.cashFlow',
        routerLink: AppPaths.CASH_FLOW,
        icon: PrimeIcons.SIGN_IN,
        visible: this.environment.featureFlags['cashFlow'],
        state: { isLoggedIn },
      },
      {
        label: 'menu.tasker',
        routerLink: AppPaths.TASKER,
        icon: PrimeIcons.BOOK,
        visible: this.environment.featureFlags['tasker'],
        state: { isLoggedIn },
      },
      {
        label: 'menu.settings',
        routerLink: AppPaths.SETTINGS,
        icon: PrimeIcons.ANDROID,
        visible: this.environment.featureFlags['settings'],
        state: { isLoggedIn },
      },
      {
        label: 'menu.settings',
        routerLink: AppPaths.SETTINGS,
        icon: PrimeIcons.SLIDERS_V,
        visible: this.environment.featureFlags['settings'],
        state: { isLoggedIn },
      },
    ].filter((item) => item.state.isLoggedIn);
  }
}
