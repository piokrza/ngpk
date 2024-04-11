import { Component, OnInit, Signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter, map, tap } from 'rxjs';

import { AuthService, MenuService } from '@ngpk/email/service';
import { AuthStateService } from '@ngpk/email/state/auth';

@Component({
  selector: 'app-root',
  template: `
    <ngpk-header [username]="(username$ | async) ?? ''" [links]="menuLinks" />

    <main class="container-max-w-md">
      <router-outlet />
    </main>

    <p-toast position="top-center" />
  `,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly authStateService: AuthStateService,
    private readonly menuService: MenuService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        tap((event): void => localStorage.setItem('previous-route', event.url))
      )
      .subscribe();
  }

  readonly username: Signal<string> = computed(() => this.authStateService.state().username);

  username$ = toObservable(this.authStateService.state).pipe(map(({ username }) => username));

  menuLinks!: MenuItem[];

  ngOnInit(): void {
    this.authService
      .checkAuth$()
      .pipe(tap(() => this.menuService.setLinks(Boolean(this.authStateService.state().isSignedIn))))
      .subscribe();
  }
}
