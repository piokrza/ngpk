import { inject, Injectable } from '@angular/core';
import { MockedCategories } from '@common/constants/categories';
import { ToastStatus } from '@common/enums/toast-status.enum';
import { Categories } from '@common/models/category.model';
import { CategoriesService } from '@common/services/categories.service';
import { ToastService } from '@common/services/toast.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesActions } from '@store/categories';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class CategoriesEffects {
  private actions$: Actions = inject(Actions);
  private categoriesService: CategoriesService = inject(CategoriesService);
  private toastService: ToastService = inject(ToastService);

  public getCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.getCategories),
      exhaustMap(() => {
        return this.categoriesService.getCategories$().pipe(
          map((categories: Categories) => {
            return CategoriesActions.getCategoriesSuccess({ categories });
          }),
          catchError((e) => {
            console.error(e);
            this.toastService.showMessage(
              ToastStatus.WARN,
              'Error during fetching categories from database',
              'Categories were injected from mockData'
            );
            return of(CategoriesActions.getCategoriesFailure({ mockedCategories: MockedCategories }));
          })
        );
      })
    );
  });
}
