import { Injectable, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, filter, map } from 'rxjs';

import { BaseDialogStyles } from '#common/constants';
import { CATEGORIES } from '#common/enums';
import { AddFormComponent } from '#pages/dashboard/features/cash-flow/components';
import { CashFlowForm, Categories, Category } from '#pages/dashboard/features/cash-flow/models';
import { CategoriesSelectors } from '#store/categories';

@Injectable({ providedIn: 'root' })
export class CashFlowService {
  protected readonly store: Store = inject(Store);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly translate: TranslateService = inject(TranslateService);

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

  public openCashFlowDialog$(isIncomeMode: boolean) {
    const dialogRef = this.dialogService.open(AddFormComponent, {
      data: isIncomeMode,
      header: this.translate.instant('cashFlow.addCashFlow'),
      style: { ...BaseDialogStyles },
    });

    return dialogRef.onClose;
  }
}
