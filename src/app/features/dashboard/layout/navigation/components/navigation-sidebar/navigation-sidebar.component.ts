import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MenuItem } from 'primeng/api';

import { AuthActions } from '#store/auth';

@Component({
  selector: 'org-navigation-sidebar',
  templateUrl: './navigation-sidebar.component.html',
  styleUrl: './navigation-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationSidebarComponent {
  private readonly store: Store = inject(Store);
  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);

  @Input({ required: true }) public menuLinks!: MenuItem[];

  public signOut(): void {
    this.confirmationService.confirm({
      message: this.translateService.instant('auth.signoutMessage'),
      header: this.translateService.instant('auth.signout'),
      accept: (): void => this.store.dispatch(AuthActions.signOut()),
    });
  }
}
