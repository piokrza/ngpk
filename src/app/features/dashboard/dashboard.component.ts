import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';

import { AuthApiService } from '#auth/services';
import { DbSubscriptionService } from '#common/services';
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
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly authApiService: AuthApiService = inject(AuthApiService);
  private readonly dbSubscriptionService: DbSubscriptionService = inject(DbSubscriptionService);

  public ngOnInit(): void {
    this.authApiService.authState$
      .pipe(
        filter(Boolean),
        tap(({ uid }) => {
          this.store.dispatch(AuthActions.loadUserData({ uid }));
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

  public ngOnDestroy(): void {
    this.dbSubscriptionService.unsubscribe();
  }
}
