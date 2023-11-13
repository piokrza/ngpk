import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { ToastStatus } from '#common/enums';
import { ToastService } from '#common/services';
import { CategoriesApi } from '#pages/dashboard/pages/cash-flow/data-access';
import { Categories } from '#pages/dashboard/pages/cash-flow/models';
import { CategoriesActions } from '#store/categories';

@Injectable()
export class CategoriesEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly categoriesApi: CategoriesApi = inject(CategoriesApi);
  private readonly toastService: ToastService = inject(ToastService);

  public getCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.getCategories),
      exhaustMap(() => {
        return this.categoriesApi.getCategories$().pipe(
          map((categories: Categories) => {
            return CategoriesActions.getCategoriesSuccess({ categories });
          }),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.WARN, 'Error!', 'Something went wrong during fetching categories from database');
            return of(CategoriesActions.getCategoriesFailure());
          })
        );
      })
    );
  });
}
