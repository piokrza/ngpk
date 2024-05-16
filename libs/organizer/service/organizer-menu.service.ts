import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Environment } from 'apps/organizer-client/src/environments';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Observable, map } from 'rxjs';

import { OrganizerPaths } from '@ngpk/organizer/enum';
import { AuthSelectors } from '@ngpk/organizer/state/auth';

@Injectable({ providedIn: 'root' })
export class OrganizerMenuService {
  private readonly store = inject(Store);
  private readonly environment = inject(Environment);

  get links$(): Observable<MenuItem[]> {
    return this.store.select(AuthSelectors.user).pipe(map((user) => this.setMenuLinks(!!user)));
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
        routerLink: OrganizerPaths.TASKER,
        icon: PrimeIcons.SIGN_IN,
        visible: this.environment.featureFlags['tasker'],
        state: { isVisible: isLoggedIn },
      },
      {
        label: 'menu.cashFlow',
        routerLink: OrganizerPaths.CASH_FLOW,
        icon: PrimeIcons.SIGN_IN,
        visible: this.environment.featureFlags['cashFlow'],
        state: { isVisible: isLoggedIn },
      },
      {
        label: 'menu.drive',
        routerLink: OrganizerPaths.DRIVE,
        icon: PrimeIcons.FOLDER,
        visible: this.environment.featureFlags['drive'],
        state: { isVisible: isLoggedIn },
      },
      {
        label: 'menu.settings',
        routerLink: OrganizerPaths.SETTINGS,
        icon: PrimeIcons.SLIDERS_V,
        visible: this.environment.featureFlags['settings'],
        state: { isVisible: isLoggedIn },
      },
    ].filter(({ state: { isVisible } }) => isVisible);
  }
}
