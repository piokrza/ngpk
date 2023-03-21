import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CashFlowForm } from '@common/models/cash-flow-form.model';
import { CashFlow } from '@common/models/cash-flow.model';
import { Category } from '@common/models/category.model';
import { CashFlowFormService } from '@common/services/cash-flow-form.service';
import { Store } from '@ngrx/store';
import { CategoriesSelectors } from '@store/categories';
import { Observable } from 'rxjs';

@Component({
  selector: 'ctrl-cash-flow-form',
  templateUrl: './cash-flow-form.component.html',
  styleUrls: ['./cash-flow-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowFormComponent {
  @Output() public cashFlowData: EventEmitter<CashFlow> = new EventEmitter<CashFlow>();

  public form: FormGroup<CashFlowForm> = inject(CashFlowFormService).createIncomeForm();

  public categories$: Observable<Category[]> = inject(Store).select(CategoriesSelectors.categories);

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cashFlowData.emit(this.form.getRawValue());
    this.form.reset();
  }
}
