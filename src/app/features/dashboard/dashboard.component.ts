import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';

import { AuthApiService } from '#auth/services';
import { DbSubscriptionService } from '#core/services';
import { AuthActions } from '#store/auth';
import { CashFlowActions } from '#store/cash-flow';
import { DriveActions } from '#store/drive';
import { TaskerActions } from '#store/tasker';

@Component({
  selector: 'org-dashboard',
  template: `
    <org-layout>
      <router-outlet />
    </org-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  readonly #store = inject(Store);
  readonly #authApiService = inject(AuthApiService);
  readonly #dbSubscriptionService = inject(DbSubscriptionService);

  public ngOnInit(): void {
    this.#authApiService.authState$
      .pipe(
        filter(Boolean),
        tap(({ uid }) => {
          this.#store.dispatch(AuthActions.loadUserData({ uid }));
          this.#store.dispatch(TaskerActions.loadTasks({ uid }));
          this.#store.dispatch(TaskerActions.loadNotes({ uid }));
          this.#store.dispatch(CashFlowActions.loadExpenses({ uid }));
          this.#store.dispatch(CashFlowActions.loadIncomes({ uid }));
          this.#store.dispatch(DriveActions.loadFiles({ uid }));
        })
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.#dbSubscriptionService.unsubscribe();
  }
}
