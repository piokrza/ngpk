import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import firebase from 'firebase/compat';
import { tap } from 'rxjs';

import { AuthApi } from '#auth/services';
import { AuthActions } from '#store/auth';
import { CashFlowActions } from '#store/cash-flow';
import { CategoriesActions } from '#store/categories';
import { DriveActions } from '#store/drive';
import { TaskerActions } from '#store/tasker';

@Injectable()
export class DashboardFacade {
  private readonly store: Store = inject(Store);
  private readonly authApi: AuthApi = inject(AuthApi);

  public initializeUserData$() {
    return this.authApi.authState$.pipe(
      tap((user: firebase.User | null) => {
        if (user) {
          this.store.dispatch(AuthActions.loadUserData());
          this.store.dispatch(CategoriesActions.getCategories());
          this.store.dispatch(TaskerActions.getTasks({ uid: user.uid }));
          this.store.dispatch(TaskerActions.getNotes({ uid: user.uid }));
          this.store.dispatch(CashFlowActions.getExpenses({ uid: user.uid }));
          this.store.dispatch(CashFlowActions.getIncomes({ uid: user.uid }));
          this.store.dispatch(DriveActions.getFiles({ uid: user.uid }));
        }
      })
    );
  }
}
