import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MenuItem, PrimeIcons } from 'primeng/api';

import { DashobardPath } from '#pages/dashboard/enums';
import { AuthActions } from '#store/auth';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly store: Store = inject(Store);
  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);

  public getMenuLinks(): MenuItem[] {
    return [
      {
        label: this.translateService.instant('menu.home'),
        routerLink: '../',
        icon: PrimeIcons.HOME,
        styleClass: 'lg:mr-2',
        routerLinkActiveOptions: { exact: true, routerLinkActive: 'active' },
      },
      {
        label: this.translateService.instant('menu.incomes'),
        routerLink: DashobardPath.INCOMES,
        icon: PrimeIcons.SIGN_IN,
      },
      {
        label: this.translateService.instant('menu.expenses'),
        routerLink: DashobardPath.EXPENSES,
        icon: PrimeIcons.SIGN_OUT,
      },
      {
        label: this.translateService.instant('menu.settings'),
        routerLink: DashobardPath.SETTINGS,
        icon: PrimeIcons.SLIDERS_V,
      },
      {
        label: this.translateService.instant('menu.logout'),
        icon: 'pi pi-fw pi-power-off',
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
