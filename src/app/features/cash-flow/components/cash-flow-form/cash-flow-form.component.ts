import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CATEGORIES } from '@common/enums/categories.enum';
import { CashFlowForm } from '@common/models/cash-flow-form.model';
import { CashFlow } from '@common/models/cash-flow.model';
import { Categories, Category } from '@common/models/category.model';
import { CashFlowFormService } from '@common/services/cash-flow-form.service';
import { Store } from '@ngrx/store';
import { CategoriesSelectors } from '@store/categories';
import { filter, map, Observable } from 'rxjs';
import uniqid from 'uniqid';

@Component({
  selector: 'ctrl-cash-flow-form',
  templateUrl: './cash-flow-form.component.html',
  styleUrls: ['./cash-flow-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowFormComponent implements OnInit {
  @Input() public isIncomeMode!: boolean;
  @Output() public cashFlowSubmitData: EventEmitter<CashFlow> = new EventEmitter<CashFlow>();

  private store: Store = inject(Store);
  public form: FormGroup<CashFlowForm> = inject(CashFlowFormService).createIncomeForm();

  public categories$!: Observable<Category[]>;

  public ngOnInit(): void {
    this.categories$ = this.store.select(CategoriesSelectors.categories).pipe(
      filter(Boolean),
      map((categories: Categories): Category[] => {
        const categoriesType: CATEGORIES = this.isIncomeMode ? CATEGORIES.INCOMES : CATEGORIES.EXPENSES;
        return categories[categoriesType];
      })
    );
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newCashFlow: CashFlow = { ...this.form.getRawValue(), id: uniqid() };

    this.cashFlowSubmitData.emit(newCashFlow);
    this.form.reset();
  }
}
