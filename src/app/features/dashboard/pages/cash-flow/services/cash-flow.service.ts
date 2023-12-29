import { Injectable, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';

import { CashFlowForm, Categories, Category } from '#cash-flow/models';
import { Collection } from '#common/enums';
import { CategoriesSelectors } from '#store/categories';

@Injectable({ providedIn: 'root' })
export class CashFlowService {
  protected readonly store: Store = inject(Store);

  private readonly activeTabIndex$$ = new BehaviorSubject<number>(0);

  public get activeTabIndex$(): Observable<number> {
    return this.activeTabIndex$$.asObservable();
  }

  public setActiveTabIndex(idx: number): void {
    this.activeTabIndex$$.next(idx);
  }

  public getCategories$(isIncomeMode: boolean): Observable<Category[]> {
    return this.store.select(CategoriesSelectors.categories).pipe(
      filter(Boolean),
      map((categories: Categories) => {
        const categoriesType = isIncomeMode ? Collection.INCOMES : Collection.EXPENSES;
        return categories[categoriesType];
      })
    );
  }

  public get form(): FormGroup<CashFlowForm> {
    return new FormGroup({
      name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
      amount: new FormControl<number>(0, { validators: [Validators.required], nonNullable: true }),
      date: new FormControl<Date | null>(null, { validators: [Validators.required] }),
      categoryCode: new FormControl<number>(0, { validators: [Validators.required], nonNullable: true }),
      description: new FormControl<string>('', { validators: [Validators.maxLength(40)], nonNullable: true }),
    });
  }
}
