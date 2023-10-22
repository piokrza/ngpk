import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, MenuItem } from 'primeng/api';

import { AuthActions } from '#store/auth';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly store: Store = inject(Store);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);

  public getMenuLinks(): MenuItem[] {
    return [
      {
        label: 'Dashboard',
        routerLink: '/',
        icon: 'pi pi-fw pi-home',
        styleClass: 'lg:mr-2',
        routerLinkActiveOptions: { exact: true, routerLinkActive: 'active' },
      },
      {
        label: 'Incomes',
        routerLink: '/incomes',
        icon: 'pi pi-fw pi-sign-in',
      },
      {
        label: 'Expenses',
        routerLink: '/expenses',
        icon: 'pi pi-fw pi-sign-out',
      },
      {
        label: 'Settings',
        routerLink: '/settings',
        icon: 'pi pi-fw pi-sliders-v',
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
