import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, MenuItem, PrimeIcons } from 'primeng/api';

import { DashobardPath } from '#pages/dashboard/enums';
import { AuthActions } from '#store/auth';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly store: Store = inject(Store);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);

  public getMenuLinks(): MenuItem[] {
    return [
      {
        label: 'Home',
        routerLink: '../',
        icon: PrimeIcons.HOME,
        styleClass: 'lg:mr-2',
        routerLinkActiveOptions: { exact: true, routerLinkActive: 'active' },
      },
      {
        label: 'Incomes',
        routerLink: DashobardPath.INCOMES,
        icon: PrimeIcons.SIGN_IN,
      },
      {
        label: 'Expenses',
        routerLink: DashobardPath.EXPENSES,
        icon: PrimeIcons.SIGN_OUT,
      },
      {
        label: 'Settings',
        routerLink: DashobardPath.SETTINGS,
        icon: PrimeIcons.SLIDERS_V,
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.signOut(),
      },
    ];
  }

  private signOut(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to signout?',
      header: 'Signout',
      accept: (): void => this.store.dispatch(AuthActions.signOut()),
    });
  }
}
