import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

import { ConfirmationService, MenuItem, PrimeIcons } from 'primeng/api';

import { DashobardPaths } from '#core/enums';
import { AuthActions } from '#store/auth';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly store = inject(Store);
  private readonly translateService = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);

  getMenuLinks(): MenuItem[] {
    return [
      {
        label: 'menu.home',
        routerLink: DashobardPaths.OVERVIEW,
        icon: PrimeIcons.HOME,
        styleClass: 'lg:mr-2',
        visible: environment.featureFlags['overview'],
      },
      {
        label: 'menu.drive',
        routerLink: DashobardPaths.DRIVE,
        icon: PrimeIcons.FOLDER,
        visible: environment.featureFlags['drive'],
      },
      {
        label: 'menu.cashFlow',
        routerLink: DashobardPaths.CASH_FLOW,
        icon: PrimeIcons.SIGN_IN,
        visible: environment.featureFlags['cashFlow'],
      },
      {
        label: 'menu.tasker',
        routerLink: DashobardPaths.TASKER,
        icon: PrimeIcons.BOOK,
        visible: environment.featureFlags['tasker'],
      },
      {
        label: 'menu.settings',
        routerLink: DashobardPaths.SETTINGS,
        icon: PrimeIcons.SLIDERS_V,
        visible: environment.featureFlags['settings'],
      },
      {
        label: 'menu.logout',
        icon: PrimeIcons.POWER_OFF,
        command: (): void => this.signOut(),
      },
    ];
  }

  private signOut(): void {
    this.confirmationService.confirm({
      message: this.translateService.instant('auth.signoutMessage'),
      header: this.translateService.instant('auth.signout'),
      accept: (): void => this.store.dispatch(AuthActions.signOut()),
    });
  }
}
