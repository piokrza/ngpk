import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, exhaustMap, from, map, of, takeUntil } from 'rxjs';

import { CashFlowApiService } from '#cash-flow/services';
import { CashFlowActions } from '#cash-flow/store';
import { ToastStatus } from '@ngpk/core/enum/';
import { DbSubscriptionService, ToastService } from '@ngpk/core/service';

@Injectable()
export class CashFlowEffects {
  private readonly actions$ = inject(Actions);
  private readonly toastService = inject(ToastService);
  private readonly translateService = inject(TranslateService);
  private readonly cashFlowApiService = inject(CashFlowApiService);
  private readonly dbSubscriptionService = inject(DbSubscriptionService);

  loadCashFlow$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.loadCashFlow),
      exhaustMap(({ uid }) => {
        return this.cashFlowApiService.loadCashFlow$(uid).pipe(
          map((cashFlow) => CashFlowActions.loadCashFlowSuccess({ cashFlow })),
          takeUntil(this.dbSubscriptionService.unsubscribe$),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('fetchUserError'));
            return of(CashFlowActions.loadCashFlowFailure());
          })
        );
      })
    );
  });

  addCashFlow$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.addCashFlow),
      exhaustMap(({ cashFlow }) => {
        return from(this.cashFlowApiService.addCashFlow$(cashFlow)).pipe(
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, this.tr('success'), this.tr('addIncomeSuccess'));
            return CashFlowActions.addCashFlowSuccess();
          }),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('loadDataError'));
            return of(CashFlowActions.addCashFlowFailure());
          })
        );
      })
    );
  });

  removeCashFlow$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.deleteCashFlow),
      exhaustMap(({ id }) => {
        return of(this.cashFlowApiService.deleteCashFlow$(id)).pipe(
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, this.tr('success'), 'Income successfully removed');
            return CashFlowActions.deleteCashFlowSuccess();
          }),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), 'Something went wrong during storing data in database');
            return of(CashFlowActions.deleteCashFlowFailure());
          })
        );
      })
    );
  });

  updateIncome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.updateCashFlow),
      exhaustMap(({ cashFlow }) => {
        return of(this.cashFlowApiService.updateCashFlow$(cashFlow)).pipe(
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, this.tr('success'), 'Income successfully updated');
            return CashFlowActions.updateCashFlowSuccess();
          }),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), 'Something went wrong during storing data in database');
            return of(CashFlowActions.updateCashFlowFailure());
          })
        );
      })
    );
  });

  private tr(path: string): string {
    return this.translateService.instant('toastMessage.' + path);
  }
}
