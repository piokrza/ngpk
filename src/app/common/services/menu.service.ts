import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private _menuLinks$: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([]);

  public setLinks(): void {
    const links: MenuItem[] = [
      {
        label: 'Dashboard',
        routerLink: '/',
        icon: 'pi pi-fw pi-home',
        styleClass: 'lg:mr-2',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'View Transactions',
        routerLink: '/transactions',
        icon: 'pi pi-fw pi-wallet',
      },
      {
        label: 'Incomes',
        routerLink: '/incomes',
        icon: 'pi pi-fw pi-pound',
      },
      {
        label: 'Expenses',
        routerLink: '/expenses',
        icon: 'pi pi-fw pi-pound',
      },
    ];

    this._menuLinks$.next(links);
  }

  public get menuLinks$(): Observable<MenuItem[]> {
    return this._menuLinks$.asObservable();
  }
}
