import { ChangeDetectionStrategy, Component, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CashFlowForm } from '@common/models/cash-flow-form.model';
import { CashFlowFormService } from '@common/services/cash-flow-form.service';

@Component({
  selector: 'ctrl-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
  providers: [CashFlowFormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeFormComponent {
  public form: FormGroup<CashFlowForm>;

  constructor(@Self() private cashFlowFormService: CashFlowFormService) {
    this.form = this.cashFlowFormService.createIncomeForm();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }
  }
}
