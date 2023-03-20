import { inject, Injectable } from '@angular/core';
import { ToastStatus } from '@common/enums/toast-status.enum';
import { ToastService } from '@common/services/toast.service';
import { MockedCategories } from '@common/constants/categories';
import { Category } from '@common/models/category.model';
import { CategoriesService } from '@common/services/categories.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesActions } from '@store/categories';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class CategoriesEffects {
  private actions$: Actions = inject(Actions);
  private categoriesService: CategoriesService = inject(CategoriesService);
  private toastService: ToastService = inject(ToastService);

  getCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.getCategories),
      switchMap(() => {
        return this.categoriesService.getCategories$().pipe(
          map((categories: Category[]) => {
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
