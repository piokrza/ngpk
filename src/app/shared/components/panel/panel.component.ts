import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, filter, map } from 'rxjs';

import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';

import { AppPaths } from '#app/core/enums';
import { AuthActions, AuthSelectors } from '#auth/store';
import { MenuService, TitleService } from '#core/services';
import { connectState } from '#core/utils';
import { ContainerComponent } from '#shared/components';

const imports = [
  RouterLink,
  FormsModule,
  ToastModule,
  ButtonModule,
  SidebarModule,
  TranslateModule,
  RouterLinkActive,
  ContainerComponent,
  ConfirmDialogModule,
];

@Component({
  selector: 'org-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class PanelComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly menuService = inject(MenuService);
  private readonly titleService = inject(TitleService);
  private readonly translateService = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);

  readonly state = connectState(this.destroyRef, {
    user: this.store.select(AuthSelectors.user),
    links: this.menuService.links$,
    title: this.titleService.title$,
    isAuthPage: this.isAuthPage$,
  });

  sidebarVisible = false;
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  ngOnInit(): void {
    this.titleService.setTitle('home');
  }

  authorize(): void {
    this.state.user &&
      this.confirmationService.confirm({
        message: this.translateService.instant('auth.signoutMessage'),
        header: this.translateService.instant('auth.signout'),
        accept: () => this.store.dispatch(AuthActions.signOut()),
      });

    !this.state.user && this.router.navigate([AppPaths.AUTHENTICATION]);

    this.sidebarVisible = false;
  }

  get isAuthPage$(): Observable<boolean> {
    return this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(({ url }) => url.includes(AppPaths.AUTHENTICATION))
    );
  }
}
