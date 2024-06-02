import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { filter, tap, Observable, switchMap, map } from 'rxjs';

import { connectState } from '@ngpk/core/util';
import { HeaderComponent } from '@ngpk/email/component/inbox';
import { previousRoute } from '@ngpk/email/constant';
import { AuthService, MenuService } from '@ngpk/email/service';
import { AuthStateService } from '@ngpk/email/state/auth';

const imports = [HeaderComponent, ToastModule, AsyncPipe];

@Component({
  selector: 'ngpk-layout',
  template: `
    <ngpk-header [username]="state.username" [links]="state.menuLinks" />

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
  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        tap((event): void => sessionStorage.setItem(previousRoute, event.url)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly menuService = inject(MenuService);
  private readonly authService = inject(AuthService);
  private readonly authStateService = inject(AuthStateService);

  readonly state = connectState(this.destroyRef, {
    username: this.authStateService.select('username'),
    menuLinks: this.menuLinks$,
  });

  get menuLinks$(): Observable<MenuItem[]> {
    return this.authService.checkAuth$().pipe(
      switchMap(() => this.authStateService.select('isSignedIn')),
      map((isSignedIn) => this.menuService.setLinks(!!isSignedIn))
    );
  }

  ngOnInit(): void {
    this.authService.checkAuth$().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
