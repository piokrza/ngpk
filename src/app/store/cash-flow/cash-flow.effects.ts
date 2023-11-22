import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, exhaustMap, from, map, of } from 'rxjs';

import { CashFlowApi } from '#cash-flow/data-access';
import { Collection, ToastStatus } from '#common/enums/';
import { ToastService } from '#common/services';
import { CashFlowActions } from '#store/cash-flow';

@Injectable()
export class CashFlowEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly cashFlowApi: CashFlowApi = inject(CashFlowApi);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly translateService: TranslateService = inject(TranslateService);

  public getCashFlowUserData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.getCashFlowUserData),
      exhaustMap(({ uid }) => {
        return this.cashFlowApi.loadUserCashFlowData$(uid).pipe(
          map((cashFlowData) => CashFlowActions.getCashFlowUserDataSuccess({ cashFlowData })),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('fetchUserError'));
            return of(CashFlowActions.getCashFlowUserDataFailure());
          })
        );
      })
    );
  });

  public addIncome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.addIncome),
      exhaustMap(({ income }) => {
        return from(this.cashFlowApi.addCashFlow$(Collection.INCOMES, income)).pipe(
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

  public addExpense$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.addExpense),
      exhaustMap(({ expense }) => {
        return from(this.cashFlowApi.addCashFlow$(Collection.EXPENSES, expense)).pipe(
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, 'Success!', 'Expense successfully added');
            return CashFlowActions.addExpenseSuccess();
          }),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, 'Error!', 'Something went wrong during storing data in database');
            return of(CashFlowActions.addExpenseFailure());
          })
        );
      })
    );
  });

  public removeIncome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.removeIncome),
      exhaustMap(({ incomeId }) => {
        return of(this.cashFlowApi.removeCashFlow$(Collection.INCOMES, incomeId)).pipe(
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, 'Success!', 'Income successfully removed');
            return CashFlowActions.removeIncomeSuccess();
          }),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, 'Error!', 'Something went wrong during storing data in database');
            return of(CashFlowActions.removeIncomeFailure());
          })
        );
      })
    );
  });

  public removeExpense$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.removeExpense),
      exhaustMap(({ expenseId }) => {
        return of(this.cashFlowApi.removeCashFlow$(Collection.EXPENSES, expenseId)).pipe(
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, 'Success!', 'Expense successfully removed');
            return CashFlowActions.removeExpenseSuccess();
          }),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, 'Error!', 'Something went wrong during storing data in database');
            return of(CashFlowActions.removeExpenseFailure());
          })
        );
      })
    );
  });

  public updateIncome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.updateIncome),
      exhaustMap(({ updatedIncome }) => {
        return of(this.cashFlowApi.updateCashFlow$(Collection.INCOMES, updatedIncome)).pipe(
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, 'Success!', 'Income successfully updated');
            return CashFlowActions.removeIncomeSuccess();
          }),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, 'Error!', 'Something went wrong during storing data in database');
            return of(CashFlowActions.removeIncomeFailure());
          })
        );
      })
    );
  });

  public updateExpense$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.updateExpense),
      exhaustMap(({ updatedExpense }) => {
        return of(this.cashFlowApi.updateCashFlow$(Collection.EXPENSES, updatedExpense)).pipe(
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, 'Success!', 'Expense successfully updated');
            return CashFlowActions.removeExpenseSuccess();
          }),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, 'Error!', 'Something went wrong during storing data in database');
            return of(CashFlowActions.removeExpenseFailure());
          })
        );
      })
    );
  });

  private tr(path: string): string {
    return this.translateService.instant('toastMessage.' + path);
  }
}
