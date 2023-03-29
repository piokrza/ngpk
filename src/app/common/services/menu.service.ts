import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
  public getMenuLinks(): MenuItem[] {
    return [
      {
        label: 'Dashboard',
        routerLink: '/',
        icon: 'pi pi-fw pi-home',
        styleClass: 'lg:mr-2',
        routerLinkActiveOptions: { exact: true },
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
    ];
  }
}
