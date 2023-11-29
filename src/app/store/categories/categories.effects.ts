import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { CategoriesApi } from '#cash-flow/data-access';
import { Categories } from '#cash-flow/models';
import { ToastStatus } from '#common/enums';
import { ToastService } from '#common/services';
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
          map((categories: Categories) => CategoriesActions.getCategoriesSuccess({ categories })),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.WARN, 'Error!', 'Something went wrong during fetching categories from database');
            return of(CategoriesActions.getCategoriesFailure());
          })
        );
      })
    );
  });
}
