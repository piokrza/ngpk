import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MenuService } from '@common/services/menu.service';
import { Store } from '@ngrx/store';
import { AuthActions } from '@store/auth';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'ctrl-navigation-panels',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navigation-panels.component.html',
})
export class NavigationPanelsComponent implements OnInit {
  private menuService: MenuService = inject(MenuService);
  private store: Store = inject(Store);
  private confirmationService: ConfirmationService = inject(ConfirmationService);

  public menuLinks$: Observable<MenuItem[]> = this.menuService.menuLinks$;

  public ngOnInit(): void {
    this.menuService.setLinks();
  }

  public signOut(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to signout?',
      header: 'Confirmation',
      accept: (): void => {
        this.store.dispatch(AuthActions.signOut());
      },
    });
  }
}
