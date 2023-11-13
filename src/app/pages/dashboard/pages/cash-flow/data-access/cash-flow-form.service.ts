import { Injectable, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';

import { CATEGORIES } from '#common/enums';
import { CashFlowForm, Categories, Category } from '#pages/dashboard/pages/cash-flow/models';
import { CategoriesSelectors } from '#store/categories';

@Injectable({ providedIn: 'root' })
export class CashFlowFormService {
  protected readonly store: Store = inject(Store);

  public get form(): FormGroup<CashFlowForm> {
    return new FormGroup({
      name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
      amount: new FormControl<number>(0, { validators: [Validators.required], nonNullable: true }),
      date: new FormControl<Date | null>(null, { validators: [Validators.required] }),
      categoryCode: new FormControl<number>(0, { validators: [Validators.required], nonNullable: true }),
      description: new FormControl<string>('', { validators: [Validators.maxLength(40)], nonNullable: true }),
    });
  }

  public getCategories$(isIncomeMode: boolean): Observable<Category[]> {
    return this.store.select(CategoriesSelectors.categories).pipe(
      filter(Boolean),
      map((categories: Categories): Category[] => {
        const categoriesType: CATEGORIES = isIncomeMode ? CATEGORIES.INCOMES : CATEGORIES.EXPENSES;
        return categories[categoriesType];
      })
    );
  }
}
