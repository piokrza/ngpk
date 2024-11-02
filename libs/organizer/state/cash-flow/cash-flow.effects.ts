import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, exhaustMap, from, map, of, takeUntil } from 'rxjs';

import { ToastStatus } from '@ngpk/core/enum/';
import { ToastService } from '@ngpk/core/service';
import { CashFlowApiService } from '@ngpk/organizer/api';
import { FirestoreDbSubscriptionService } from '@ngpk/organizer/service/shared';
import { CashFlowActions } from '@ngpk/organizer/state/cash-flow';

@Injectable()
export class CashFlowEffects {
  readonly #actions$ = inject(Actions);
  readonly #toastService = inject(ToastService);
  readonly #translateService = inject(TranslateService);
  readonly #cashFlowApiService = inject(CashFlowApiService);
  readonly #firestoreDbSubscriptionService = inject(FirestoreDbSubscriptionService);

  readonly #tr = (path: string) => this.#translateService.instant('toastMessage.' + path);

  loadCashFlow$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(CashFlowActions.loadCashFlow),
      exhaustMap(({ uid }) => {
        return this.#cashFlowApiService.loadCashFlow$(uid).pipe(
          map((cashFlow) => CashFlowActions.loadCashFlowSuccess({ cashFlow })),
          catchError(() => {
            this.#toastService.showMessage(ToastStatus.ERROR, this.#tr('error'), this.#tr('fetchUserError'));
            return of(CashFlowActions.loadCashFlowFailure());
          }),
          takeUntil(this.#firestoreDbSubscriptionService.unsubscribe$)
        );
      })
    );
  });

  addCashFlow$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(CashFlowActions.addCashFlow),
      exhaustMap(({ cashFlow }) => {
        return from(this.#cashFlowApiService.addCashFlow$(cashFlow)).pipe(
          map(() => {
            this.#toastService.showMessage(ToastStatus.SUCCESS, this.#tr('success'), this.#tr('addIncomeSuccess'));
            return CashFlowActions.addCashFlowSuccess();
          }),
          catchError(() => {
            this.#toastService.showMessage(ToastStatus.ERROR, this.#tr('error'), this.#tr('loadDataError'));
            return of(CashFlowActions.addCashFlowFailure());
          })
        );
      })
    );
  });

  removeCashFlow$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(CashFlowActions.deleteCashFlow),
      exhaustMap(({ id }) => {
        return of(this.#cashFlowApiService.deleteCashFlow$(id)).pipe(
          map(() => {
            this.#toastService.showMessage(ToastStatus.SUCCESS, this.#tr('success'), 'Income successfully removed');
            return CashFlowActions.deleteCashFlowSuccess();
          }),
          catchError(() => {
            this.#toastService.showMessage(ToastStatus.ERROR, this.#tr('error'), 'Something went wrong during storing data in database');
            return of(CashFlowActions.deleteCashFlowFailure());
          })
        );
      })
    );
  });

  updateIncome$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(CashFlowActions.updateCashFlow),
      exhaustMap(({ cashFlow }) => {
        return of(this.#cashFlowApiService.updateCashFlow$(cashFlow)).pipe(
          map(() => {
            this.#toastService.showMessage(ToastStatus.SUCCESS, this.#tr('success'), 'Income successfully updated');
            return CashFlowActions.updateCashFlowSuccess();
          }),
          catchError(() => {
            this.#toastService.showMessage(ToastStatus.ERROR, this.#tr('error'), 'Something went wrong during storing data in database');
            return of(CashFlowActions.updateCashFlowFailure());
          })
        );
      })
    );
  });
}
