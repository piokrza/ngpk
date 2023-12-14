import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';

import { AuthApi } from '#auth/services';
import { AuthActions } from '#store/auth';
import { CashFlowActions } from '#store/cash-flow';
import { CategoriesActions } from '#store/categories';
import { DriveActions } from '#store/drive';
import { TaskerActions } from '#store/tasker';

@Component({
  selector: 'ctrl-dashboard',
  template: `
    <ctrl-layout>
      <router-outlet />
    </ctrl-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private readonly store: Store = inject(Store);
  private readonly authApi: AuthApi = inject(AuthApi);

  public ngOnInit(): void {
    this.authApi.authState$
      .pipe(
        filter(Boolean),
        tap(({ uid }) => {
          this.store.dispatch(AuthActions.loadUserData());
          this.store.dispatch(CategoriesActions.getCategories());
          this.store.dispatch(TaskerActions.getTasks({ uid }));
          this.store.dispatch(TaskerActions.getNotes({ uid }));
          this.store.dispatch(CashFlowActions.getExpenses({ uid }));
          this.store.dispatch(CashFlowActions.getIncomes({ uid }));
          this.store.dispatch(DriveActions.getFiles({ uid }));
        })
      )
      .subscribe();
  }
}
