import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import firebase from 'firebase/compat';
import { PrimeNGConfig } from 'primeng/api';
import { tap } from 'rxjs';

import { AuthService } from '#pages/auth/services';
import { AuthActions } from '#store/auth';
import { CashFlowActions } from '#store/cash-flow';
import { CategoriesActions } from '#store/categories';
import { TaskerActions } from '#store/tasker';

@Component({
  selector: 'ctrl-root',
  template: `<router-outlet />`,
})
export class AppComponent implements OnInit {
  private readonly store: Store = inject(Store);
  private readonly authService: AuthService = inject(AuthService);
  private readonly primengConfig: PrimeNGConfig = inject(PrimeNGConfig);
  private readonly translateService: TranslateService = inject(TranslateService);

  public ngOnInit(): void {
    this.setPrimengConfig();
    this.initializeUserData$().subscribe();
  }

  public initializeUserData$() {
    return this.authService.authState$.pipe(
      tap((user: firebase.User | null) => {
        if (user) {
          this.store.dispatch(CategoriesActions.getCategories());
          this.store.dispatch(AuthActions.loadUserData());
          this.store.dispatch(CashFlowActions.getCashFlowUserData({ uid: user.uid }));
          this.store.dispatch(TaskerActions.getTasksUserData({ uid: user.uid }));
        }
      })
    );
  }

  public setPrimengConfig(): void {
    this.primengConfig.ripple = true;
    this.translateService.get('primeng').subscribe((res) => this.primengConfig.setTranslation(res));
  }
}
