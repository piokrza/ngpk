import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoriesSelectors } from '@app/store/categories';
import { CashFlowForm } from '@common/models/cash-flow-form.model';
import { CashFlowPayload } from '@common/models/cash-flow-payload.model';
import { Category } from '@common/models/category.model';
import { CashFlowFormService } from '@common/services/cash-flow-form.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'ctrl-cash-flow-form',
  templateUrl: './cash-flow-form.component.html',
  styleUrls: ['./cash-flow-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowFormComponent {
  @Output() public cashFlowData: EventEmitter<CashFlowPayload> = new EventEmitter<CashFlowPayload>();

  private store: Store = inject(Store);

  public form: FormGroup<CashFlowForm>;
  public categories$: Observable<Category[]> = this.store.select(CategoriesSelectors.categories);

  constructor(private cashFlowFormService: CashFlowFormService) {
    this.form = this.cashFlowFormService.createIncomeForm();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cashFlowData.emit(this.form.value as CashFlowPayload);
  }
}
