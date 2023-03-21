import { inject, Injectable } from '@angular/core';
import { ToastStatus } from '@common/enums/toast-status.enum';
import { CashFlow } from '@common/models/cash-flow.model';
import { ToastService } from '@common/services/toast.service';
import { IncomesService } from '@incomes/services/incomes.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IncomesActions } from '@store/incomes';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

@Injectable()
export class IncomesEffects {
  private actions$: Actions = inject(Store);
  private incomesService: IncomesService = inject(IncomesService);
  private toastService: ToastService = inject(ToastService);

  public getIncomes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IncomesActions.getIncomes),
      exhaustMap(() => {
        return this.incomesService.getIncomes$().pipe(
          map((incomes: CashFlow[]) => {
            console.log(incomes);
            return IncomesActions.getIncomesSuccess({ incomes });
          }),
          catchError((e) => {
            console.error(e);
            this.toastService.showMessage(
              ToastStatus.WARN,
              'Error!',
              'Something went wrong during fetching incomes from database'
            );
            return of(IncomesActions.getIncomesFailure());
          })
        );
      })
    );
  });

  public addIncome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IncomesActions.addIncome),
      tap((income) => {
        console.log(income);
      })
    );
  });
}
