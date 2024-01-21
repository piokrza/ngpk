import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, exhaustMap, from, map, of, takeUntil } from 'rxjs';

import { CashFlowApiService } from '#cash-flow/services';
import { CashFlowActions } from '#cash-flow/store';
import { Collection, ToastStatus } from '#core/enums/';
import { DbSubscriptionService, ToastService } from '#core/services';

@Injectable()
export class CashFlowEffects {
  private readonly actions$ = inject(Actions);
  private readonly toastService = inject(ToastService);
  private readonly translateService = inject(TranslateService);
  private readonly cashFlowApiService = inject(CashFlowApiService);
  private readonly dbSubscriptionService = inject(DbSubscriptionService);

  getExpenses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.loadExpenses),
      exhaustMap(({ uid }) => {
        return this.cashFlowApiService.loadExpenses$(uid).pipe(
          map((expenses) => CashFlowActions.loadExpensesSuccess({ expenses })),
          takeUntil(this.dbSubscriptionService.unsubscribe$),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('fetchUserError'));
            return of(CashFlowActions.loadExpensesFailure());
          })
        );
      })
    );
  });

  getIncomes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.loadIncomes),
      exhaustMap(({ uid }) => {
        return this.cashFlowApiService.loadIncomes$(uid).pipe(
          map((incomes) => CashFlowActions.loadIncomesSuccess({ incomes })),
          takeUntil(this.dbSubscriptionService.unsubscribe$),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('fetchUserError'));
            return of(CashFlowActions.loadIncomesFailure());
          })
        );
      })
    );
  });

  addIncome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.addIncome),
      exhaustMap(({ income }) => {
        return from(this.cashFlowApiService.addCashFlow$(Collection.INCOMES, income)).pipe(
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, this.tr('success'), this.tr('addIncomeSuccess'));
            return CashFlowActions.addIncomeSuccess();
          }),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('addIncomeError'));
            return of(CashFlowActions.addIncomeFailure());
          })
        );
      })
    );
  });

  addExpense$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.addExpense),
      exhaustMap(({ expense }) => {
        return from(this.cashFlowApiService.addCashFlow$(Collection.EXPENSES, expense)).pipe(
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, this.tr('success'), 'Expense successfully added');
            return CashFlowActions.addExpenseSuccess();
          }),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), 'Something went wrong during storing data in database');
            return of(CashFlowActions.addExpenseFailure());
          })
        );
      })
    );
  });

  removeIncome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.removeIncome),
      exhaustMap(({ incomeId }) => {
        return of(this.cashFlowApiService.removeCashFlow$(Collection.INCOMES, incomeId)).pipe(
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, this.tr('success'), 'Income successfully removed');
            return CashFlowActions.removeIncomeSuccess();
          }),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), 'Something went wrong during storing data in database');
            return of(CashFlowActions.removeIncomeFailure());
          })
        );
      })
    );
  });

  removeExpense$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.removeExpense),
      exhaustMap(({ expenseId }) => {
        return of(this.cashFlowApiService.removeCashFlow$(Collection.EXPENSES, expenseId)).pipe(
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, this.tr('success'), 'Expense successfully removed');
            return CashFlowActions.removeExpenseSuccess();
          }),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), 'Something went wrong during storing data in database');
            return of(CashFlowActions.removeExpenseFailure());
          })
        );
      })
    );
  });

  updateIncome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.updateIncome),
      exhaustMap(({ updatedIncome }) => {
        return of(this.cashFlowApiService.updateCashFlow$(Collection.INCOMES, updatedIncome)).pipe(
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, this.tr('success'), 'Income successfully updated');
            return CashFlowActions.updateIncomeSuccess();
          }),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), 'Something went wrong during storing data in database');
            return of(CashFlowActions.updateIncomeFailure());
          })
        );
      })
    );
  });

  updateExpense$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.updateExpense),
      exhaustMap(({ updatedExpense }) => {
        return of(this.cashFlowApiService.updateCashFlow$(Collection.EXPENSES, updatedExpense)).pipe(
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, this.tr('success'), 'Expense successfully updated');
            return CashFlowActions.updateExpenseSuccess();
          }),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), 'Something went wrong during storing data in database');
            return of(CashFlowActions.updateExpenseFailure());
          })
        );
      })
    );
  });

  private tr(path: string): string {
    return this.translateService.instant('toastMessage.' + path);
  }
}
