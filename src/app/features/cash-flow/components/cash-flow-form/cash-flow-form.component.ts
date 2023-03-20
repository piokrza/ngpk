import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Category } from '@common/models/category.model';
import { Categories } from '@common/constants/categories';
import { CashFlowForm } from '@common/models/cash-flow-form.model';
import { CashFlowFormService } from '@common/services/cash-flow-form.service';
import { CashFlowPayload } from '@common/models/cash-flow-payload.model';

@Component({
  selector: 'ctrl-cash-flow-form',
  templateUrl: './cash-flow-form.component.html',
  styleUrls: ['./cash-flow-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowFormComponent {
  @Output() public cashFlowData: EventEmitter<CashFlowPayload> = new EventEmitter<CashFlowPayload>();

  public form: FormGroup<CashFlowForm>;
  public categories: Category[] = Categories;

  constructor(private cashFlowFormService: CashFlowFormService) {
    this.form = this.cashFlowFormService.createIncomeForm();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cashFlowData.emit(this.cashFlowFormService.getCashFlowPayload(this.form));
  }
}
