import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Environment } from 'src/environments';

import { ConfirmationService, MenuItem, PrimeIcons } from 'primeng/api';

import { AuthActions } from '#auth/store';
import { AppPaths } from '#core/enums';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly store = inject(Store);
  private readonly environment = inject(Environment);
  private readonly translateService = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);

  getMenuLinks(): MenuItem[] {
    return [
      {
        label: 'menu.drive',
        routerLink: AppPaths.DRIVE,
        icon: PrimeIcons.FOLDER,
        visible: this.environment.featureFlags['drive'],
      },
      {
        label: 'menu.cashFlow',
        routerLink: AppPaths.CASH_FLOW,
        icon: PrimeIcons.SIGN_IN,
        visible: this.environment.featureFlags['cashFlow'],
      },
      {
        label: 'menu.tasker',
        routerLink: AppPaths.TASKER,
        icon: PrimeIcons.BOOK,
        visible: this.environment.featureFlags['tasker'],
      },
      {
        label: 'menu.settings',
        routerLink: AppPaths.SETTINGS,
        icon: PrimeIcons.SLIDERS_V,
        visible: this.environment.featureFlags['settings'],
      },
      {
        label: 'menu.logout',
        icon: PrimeIcons.POWER_OFF,
        command: () => this.signOut(),
      },
    ];
  }

  private signOut(): void {
    this.confirmationService.confirm({
      message: this.translateService.instant('auth.signoutMessage'),
      header: this.translateService.instant('auth.signout'),
      accept: () => this.store.dispatch(AuthActions.signOut()),
    });
  }
}
