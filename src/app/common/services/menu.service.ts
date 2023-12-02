import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MenuItem, PrimeIcons } from 'primeng/api';

import { DashobardPaths } from '#dashboard/enums';
import { AuthActions } from '#store/auth';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly store: Store = inject(Store);
  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);

  public getMenuLinks(): MenuItem[] {
    return [
      {
        label: 'menu.home',
        routerLink: DashobardPaths.OVERVIEW,
        icon: PrimeIcons.HOME,
        styleClass: 'lg:mr-2',
      },
      {
        label: 'menu.drive',
        routerLink: DashobardPaths.DRIVE,
        icon: PrimeIcons.FOLDER,
      },
      {
        label: 'menu.cashFlow',
        routerLink: DashobardPaths.CASH_FLOW,
        icon: PrimeIcons.SIGN_IN,
      },
      {
        label: 'menu.tasker',
        routerLink: DashobardPaths.TASKER,
        icon: PrimeIcons.BOOK,
      },
      {
        label: 'menu.web3',
        routerLink: DashobardPaths.WEB3,
        icon: PrimeIcons.BITCOIN,
      },
      {
        label: 'menu.settings',
        routerLink: DashobardPaths.SETTINGS,
        icon: PrimeIcons.SLIDERS_V,
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
