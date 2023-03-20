import { inject, Injectable } from '@angular/core';
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
            return of(CategoriesActions.getCategoriesFailure({ mockedCategories: MockedCategories }));
          })
        );
      })
    );
  });
}
