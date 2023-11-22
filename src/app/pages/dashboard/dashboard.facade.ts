import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import firebase from 'firebase/compat';
import { tap } from 'rxjs';

import { AuthService } from '#auth/services';
import { AuthActions } from '#store/auth';
import { CashFlowActions } from '#store/cash-flow';
import { CategoriesActions } from '#store/categories';
import { TaskerActions } from '#store/tasker';

@Injectable()
export class DashboardFacade {
  private readonly store: Store = inject(Store);
  private readonly authService: AuthService = inject(AuthService);

  public initializeUserData$() {
    return this.authService.authState$.pipe(
      tap((user: firebase.User | null) => {
        if (user) {
          this.store.dispatch(CategoriesActions.getCategories());
          this.store.dispatch(AuthActions.loadUserData());
          this.store.dispatch(CashFlowActions.getCashFlowUserData({ uid: user.uid }));
          this.store.dispatch(TaskerActions.getTaskerUserData({ uid: user.uid }));
        }
      })
    );
  }
}
