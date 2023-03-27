import { inject, Injectable } from '@angular/core';
import { CashFlowService } from '@dashboard/services/cash-flow.service';
import { ToastStatus } from '@common/enums/toast-status.enum';
import { CashFlow } from '@common/models/cash-flow.model';
import { DbService } from '@common/services/db.service';
import { ToastService } from '@common/services/toast.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CashFlowActions } from '@store/cash-flow';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

@Injectable()
export class IncomesEffects {
  private actions$: Actions = inject(Actions);
  private cashFlowService: CashFlowService = inject(CashFlowService);
  private toastService: ToastService = inject(ToastService);
  private db: DbService = inject(DbService);

  public getIncomes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.getIncomes),
      exhaustMap(() => {
        return this.cashFlowService.getIncomes$().pipe(
          map((incomes: CashFlow[]) => {
            return CashFlowActions.getIncomesSuccess({ incomes });
          }),
          catchError((e) => {
            console.error(e);
            this.toastService.showMessage(
              ToastStatus.WARN,
              'Error!',
              'Something went wrong during fetching incomes from database'
            );
            return of(CashFlowActions.getIncomesFailure());
          })
        );
      })
    );
  });

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

  public getExpenses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashFlowActions.getIncomes),
      exhaustMap(() => {
        return this.cashFlowService.getExpenses$().pipe(
          map((expenses: CashFlow[]) => {
            return CashFlowActions.getExpensesSuccess({ expenses });
          }),
          catchError((e) => {
            console.error(e);
            this.toastService.showMessage(
              ToastStatus.WARN,
              'Error!',
              'Something went wrong during fetching expensess from database'
            );
            return of(CashFlowActions.getIncomesFailure());
          })
        );
      })
    );
  });

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
}
