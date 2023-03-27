import { inject, Injectable } from '@angular/core';
import { ToastStatus } from '@common/enums/toast-status.enum';
import { DbService } from '@common/services/db.service';
import { ToastService } from '@common/services/toast.service';
import { CashFlowService } from '@dashboard/services/cash-flow.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CashFlowActions } from '@store/cash-flow';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';

@Injectable()
export class IncomesEffects {
  private actions$: Actions = inject(Actions);
  private cashFlowService: CashFlowService = inject(CashFlowService);
  private toastService: ToastService = inject(ToastService);
  private db: DbService = inject(DbService);

  public addIncome$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CashFlowActions.addIncome),
        tap((income: any): void => {
          this.db.addIncome(income);
          this.toastService.showMessage(ToastStatus.SUCCESS, 'Success!', 'Income successfully added');
        })
      );
    },
    { dispatch: false }
  );

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

  public addExpense$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CashFlowActions.addExpense),
        tap((): void => {
          this.toastService.showMessage(ToastStatus.SUCCESS, 'Success!', 'Expense successfully added');
        })
      );
    },
    { dispatch: false }
  );

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
        return this.cashFlowService.loadUserCashFlowData$(uid).pipe(
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
