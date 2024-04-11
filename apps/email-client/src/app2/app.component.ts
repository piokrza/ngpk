import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthState } from '@auth/state';
import { Observable, tap, switchMap } from 'rxjs';
import { MenuService } from '@shared/services';
import { AuthService } from '@auth/services';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <app-header [username]="(username$ | async)!" [links]="menuLinks"></app-header>

    <main class="container-max-w-md">
      <router-outlet></router-outlet>
    </main>

    <p-toast position="top-center"></p-toast>
  `,
})
export class AppComponent implements OnInit {
  username$: Observable<string> = this.authState.getUsername$();

  menuLinks!: MenuItem[];

  constructor(
    private authState: AuthState,
    private menuService: MenuService,
    private authService: AuthService,
    private router: Router
  ) {
    this.router.events
      .pipe(
        tap((event: unknown): void => {
          event instanceof NavigationEnd && localStorage.setItem('previous-route', event.url);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.authService
      .checkAuth$()
      .pipe(
        switchMap((): Observable<boolean> => this.authState.getSignedIn$()),
        tap((signedIn: boolean): void => {
          this.menuService.setLinks(signedIn);
        })
      )
      .subscribe();
  }
}
