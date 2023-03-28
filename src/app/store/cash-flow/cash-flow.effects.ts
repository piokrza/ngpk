import { inject, Injectable } from '@angular/core';
import { Collection } from '@common/enums/collection.enum';
import { ToastStatus } from '@common/enums/toast-status.enum';
import { DbService } from '@common/services/db.service';
import { ToastService } from '@common/services/toast.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CashFlowActions } from '@store/cash-flow';
import { catchError, exhaustMap, from, map, of, tap } from 'rxjs';

@Injectable()
export class IncomesEffects {
  private actions$: Actions = inject(Actions);
  private toastService: ToastService = inject(ToastService);
  private dbService: DbService = inject(DbService);

  public addIncome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.addIncome),
      exhaustMap(({ income }) => {
        console.log(income);
        return from(this.dbService.addCashFlow$(income, Collection.INCOMES)).pipe(
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, 'Success!', 'Income successfully added');
            return CashFlowActions.addIncomeSuccess();
          }),
          catchError((e) => {
            this.toastService.showMessage(
              ToastStatus.ERROR,
              'Error!',
              'Something went wrong during storing data in database'
            );
            console.error(e);
            return of(CashFlowActions.addIncomeFailure());
          })
        );
      })
    );
  });

  public removeIncome$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CashFlowActions.removeIncome),
        tap((): void => {
          this.toastService.showMessage(ToastStatus.SUCCESS, 'Success!', 'Income successfully removed');
        })
      );
    },
    { dispatch: false }
  );

  public addExpense$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.addExpense),
      exhaustMap(({ expense }) => {
        return from(this.dbService.addCashFlow$(expense, Collection.EXPENSES)).pipe(
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, 'Success!', 'Expense successfully added');
            return CashFlowActions.addExpenseSuccess();
          }),
          catchError((e) => {
            this.toastService.showMessage(
              ToastStatus.ERROR,
              'Error!',
              'Something went wrong during storing data in database'
            );
            console.error(e);
            return of(CashFlowActions.addExpenseFailure());
          })
        );
      })
    );
  });

  public removeExpense$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CashFlowActions.removeExpense),
        tap((): void => {
          this.toastService.showMessage(ToastStatus.SUCCESS, 'Success!', 'Expense successfully removed');
        })
      );
    },
    { dispatch: false }
  );

  public getCashFlowUserData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.getCashFlowUserData),
      exhaustMap(({ uid }) => {
        return this.dbService.loadUserCashFlowData$(uid).pipe(
          map((cashFlowData) => CashFlowActions.getCashFlowUserDataSuccess({ cashFlowData })),
          catchError((e) => {
            this.toastService.showMessage(ToastStatus.ERROR, 'Error!', 'Something went wrong during fetch user data');
            console.error(e);
            return of(CashFlowActions.getCashFlowUserDataFailure());
          })
        );
      })
    );
  });
}
