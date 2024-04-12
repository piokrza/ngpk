import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { filter, tap, Observable, switchMap, map } from 'rxjs';

import { AuthService, MenuService } from '@ngpk/email/service';
import { HeaderComponent } from '@ngpk/email/shared/components';
import { AuthStateService } from '@ngpk/email/state/auth';

const imports = [HeaderComponent, ToastModule, AsyncPipe];

@Component({
  selector: 'ngpk-layout',
  template: `
    <ngpk-header [username]="(username$ | async) ?? ''" [links]="(menuLinks$ | async) ?? []" />

    <main class="container-max-w-md">
      <ng-content />
    </main>

    <p-toast position="top-center" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class LayoutComponent implements OnInit {
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

  readonly username$: Observable<string> = this.authStateService.select('username');
  readonly menuLinks$: Observable<MenuItem[]> = this.authService.checkAuth$().pipe(
    switchMap(() => this.authStateService.select('isSignedIn')),
    map((isSignedIn) => this.menuService.setLinks(!!isSignedIn))
  );

  ngOnInit(): void {
    this.authService.checkAuth$().subscribe();
  }
}
