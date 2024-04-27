import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { Observable, filter, map } from 'rxjs';

import { AuthActions, AuthSelectors } from '@ngpk/auth-organizer/state';
import { OrganizerPaths } from '@ngpk/core/enum';
import { OrganizerMenuService, TitleService } from '@ngpk/core/service';
import { connectState } from '@ngpk/core/util';
import { ContainerComponent } from '@ngpk/shared-ui/components';
import { WeatherWidgetComponent } from '@ngpk/weather/feature';

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
  WeatherWidgetComponent,
];

@Component({
  selector: 'ngpk-organizer-layout',
  templateUrl: './organizer-layout.component.html',
  styleUrl: './organizer-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class OrganizerLayoutComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly titleService = inject(TitleService);
  private readonly translateService = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly organizerMenuService = inject(OrganizerMenuService);

  readonly state = connectState(this.destroyRef, {
    user: this.store.select(AuthSelectors.user),
    links: this.organizerMenuService.links$,
    title: this.titleService.title$,
    isTitleVisible: this.isTitleVisible$,
  });

  readonly sidebarVisible = signal(false);
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  authorize(): void {
    if (this.state.user) {
      this.confirmationService.confirm({
        message: this.translateService.instant('auth.signoutMessage'),
        header: this.translateService.instant('auth.signout'),
        accept: () => this.store.dispatch(AuthActions.signOut()),
      });
    } else {
      this.router.navigate([OrganizerPaths.AUTHENTICATION]);
    }

    this.sidebarVisible.set(false);
  }

  get isTitleVisible$(): Observable<boolean> {
    return this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(({ url }) => !(url.includes(OrganizerPaths.AUTHENTICATION) || url === '/'))
    );
  }
}
