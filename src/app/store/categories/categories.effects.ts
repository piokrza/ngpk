import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, takeUntil } from 'rxjs';

import { CategoriesApiService } from '#cash-flow/data-access';
import { Categories } from '#cash-flow/models';
import { ToastStatus } from '#common/enums';
import { DbSubscriptionService, ToastService } from '#common/services';
import { CategoriesActions } from '#store/categories';

@Injectable()
export class CategoriesEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly dbSubscriptionService: DbSubscriptionService = inject(DbSubscriptionService);
  private readonly categoriesApiService: CategoriesApiService = inject(CategoriesApiService);

  public getCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.getCategories),
      exhaustMap(() => {
        return this.categoriesApiService.getCategories$().pipe(
          map((categories: Categories) => CategoriesActions.getCategoriesSuccess({ categories })),
          takeUntil(this.dbSubscriptionService.unsubscribe$),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.WARN, 'Error!', 'Something went wrong during fetching categories from database');
            return of(CategoriesActions.getCategoriesFailure());
          })
        );
      })
    );
  });
}
