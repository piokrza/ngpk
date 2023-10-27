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
        label: 'menu.home',
        routerLink: '../',
        icon: PrimeIcons.HOME,
        styleClass: 'lg:mr-2',
        routerLinkActiveOptions: { exact: true, routerLinkActive: 'active' },
      },
      {
        label: 'menu.incomes',
        routerLink: DashobardPath.INCOMES,
        icon: PrimeIcons.SIGN_IN,
      },
      {
        label: 'menu.expenses',
        routerLink: DashobardPath.EXPENSES,
        icon: PrimeIcons.SIGN_OUT,
      },
      {
        label: 'menu.settings',
        routerLink: DashobardPath.SETTINGS,
        icon: PrimeIcons.SLIDERS_V,
      },
      {
        label: 'menu.logout',
        icon: 'pi pi-fw pi-power-off',
        command: (): void => this.signOut(),
      },
    ];
  }

  private signOut(): void {
    this.confirmationService.confirm({
      message: 'auth.signoutMessage',
      header: 'auth.signout',
      accept: (): void => this.store.dispatch(AuthActions.signOut()),
    });
  }
}
