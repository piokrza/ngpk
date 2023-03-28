import { inject, Injectable } from '@angular/core';
import { Collection } from '@common/enums/collection.enum';
import { ToastStatus } from '@common/enums/toast-status.enum';
import { DbService } from '@common/services/db.service';
import { ToastService } from '@common/services/toast.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CashFlowActions } from '@store/cash-flow';
import { catchError, exhaustMap, from, map, of } from 'rxjs';

@Injectable()
export class CashFlowEffects {
  private actions$: Actions = inject(Actions);
  private toastService: ToastService = inject(ToastService);
  private dbService: DbService = inject(DbService);

  public addIncome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.addIncome),
      exhaustMap(({ income }) => {
        return from(this.dbService.addCashFlow$(Collection.INCOMES, income)).pipe(
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, 'Success!', 'Income successfully added');
            return CashFlowActions.addIncomeSuccess();
          }),

          catchError((err) => {
            this.toastService.showMessage(
              ToastStatus.ERROR,
              'Error!',
              'Something went wrong during storing data in database'
            );
            console.error(err);
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
        return from(this.dbService.addCashFlow$(Collection.EXPENSES, expense)).pipe(
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, 'Success!', 'Expense successfully added');
            return CashFlowActions.addExpenseSuccess();
          }),

          catchError((err) => {
            this.toastService.showMessage(
              ToastStatus.ERROR,
              'Error!',
              'Something went wrong during storing data in database'
            );
            console.error(err);
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
        return of(this.dbService.removeCashFlow$(Collection.INCOMES, incomeId)).pipe(
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, 'Success!', 'Income successfully removed');
            return CashFlowActions.removeIncomeSuccess();
          }),

          catchError((err) => {
            this.toastService.showMessage(
              ToastStatus.ERROR,
              'Error!',
              'Something went wrong during storing data in database'
            );
            console.error(err);
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
        return of(this.dbService.removeCashFlow$(Collection.EXPENSES, expenseId)).pipe(
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, 'Success!', 'Expense successfully removed');
            return CashFlowActions.removeExpenseSuccess();
          }),

          catchError(() => {
            this.toastService.showMessage(
              ToastStatus.ERROR,
              'Error!',
              'Something went wrong during storing data in database'
            );
            return of(CashFlowActions.removeExpenseFailure());
          })
        );
      })
    );
  });

  public getCashFlowUserData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.getCashFlowUserData),
      exhaustMap(({ uid }) => {
        return this.dbService.loadUserCashFlowData$(uid).pipe(
          map((cashFlowData) => CashFlowActions.getCashFlowUserDataSuccess({ cashFlowData })),

          catchError((err) => {
            this.toastService.showMessage(ToastStatus.ERROR, 'Error!', 'Something went wrong during fetch user data');
            console.error(err);
            return of(CashFlowActions.getCashFlowUserDataFailure());
          })
        );
      })
    );
  });
}
