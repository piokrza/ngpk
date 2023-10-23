import { inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';

import { CATEGORIES } from '#common/enums';
import { Category, Categories } from '#common/models';
import { CashFlowForm } from '#features/cash-flow/models';
import { CashFlowFormService } from '#features/cash-flow/services';
import { CategoriesSelectors } from '#store/categories';

export abstract class BaseCashFlowForm {
  protected readonly store: Store = inject(Store);
  protected readonly form: FormGroup<CashFlowForm> = inject(CashFlowFormService).createCashFlowForm();

  abstract readonly categories$: Observable<Category[]>;

  protected getCategories$(isIncomeMode: boolean): Observable<Category[]> {
    return this.store.select(CategoriesSelectors.categories).pipe(
      filter(Boolean),
      map((categories: Categories): Category[] => {
        const categoriesType: CATEGORIES = isIncomeMode ? CATEGORIES.INCOMES : CATEGORIES.EXPENSES;
        return categories[categoriesType];
      })
    );
  }
}
