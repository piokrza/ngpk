import { inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CATEGORIES } from '@common/enums/categories.enum';
import { Category, Categories } from '@common/models/category.model';
import { CashFlowFormService } from '@dashboard/services/cash-flow-form.service';
import { CategoriesSelectors } from '@store/categories';
import { Store } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';
import { CashFlowForm } from '@features/cash-flow/models/cash-flow-form.model';

export abstract class BaseCashFlowForm {
  protected readonly store: Store = inject(Store);
  protected readonly form: FormGroup<CashFlowForm> = inject(CashFlowFormService).createCashFlowForm();

  abstract categories$: Observable<Category[]>;

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
