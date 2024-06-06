import { ChangeDetectionStrategy, Component, DestroyRef, Signal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';

import { connectState } from '@ngpk/core/util';
import { OrganizerPaths } from '@ngpk/organizer/enum';
import { OrganizerMenuService, TitleService } from '@ngpk/organizer/service/shared';
import { AuthActions, AuthSelectors } from '@ngpk/organizer/state/auth';
import { WeatherWidgetComponent } from '@ngpk/weather/feature';

const imports = [
  RouterLink,
  FormsModule,
  ToastModule,
  ButtonModule,
  SidebarModule,
  TranslateModule,
  RouterLinkActive,
  ConfirmDialogModule,
  WeatherWidgetComponent,
];

@Component({
  selector: 'ngpk-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class LayoutComponent {
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
  });

  readonly title: Signal<string> = this.titleService.title;

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
}
