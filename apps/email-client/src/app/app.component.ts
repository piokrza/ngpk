import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable, filter, map, switchMap, tap } from 'rxjs';

import { AuthService, MenuService } from '@ngpk/email/service';
import { AuthStateService } from '@ngpk/email/state/auth';

@Component({
  selector: 'app-root',
  template: `
    <ngpk-header [username]="(username$ | async) ?? ''" [links]="(menuLinks$ | async) ?? []" />

    <main class="container-max-w-md">
      <router-outlet />
    </main>

    <p-toast position="top-center" />
  `,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly menuService: MenuService,
    private readonly authService: AuthService,
    private readonly authStateService: AuthStateService
  ) {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        tap((event): void => sessionStorage.setItem('previous-route', event.url))
      )
      .subscribe();
  }

  username$: Observable<string> = this.authStateService.select('username');
  menuLinks$: Observable<MenuItem[]> = this.authService.checkAuth$().pipe(
    switchMap(() => this.authStateService.select('isSignedIn')),
    map((isSignedIn) => this.menuService.setLinks(!!isSignedIn))
  );

  ngOnInit(): void {
    this.authService.checkAuth$().subscribe();
  }
}
