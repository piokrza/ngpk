import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CashFlowForm } from '@common/models/cash-flow-form.model';
import { CashFlowFormService } from '@common/services/cash-flow-form.service';

@Component({
  selector: 'ctrl-cash-flow-form',
  templateUrl: './cash-flow-form.component.html',
  styleUrls: ['./cash-flow-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowFormComponent {
  public form: FormGroup<CashFlowForm>;

  constructor(private cashFlowFormService: CashFlowFormService) {
    this.form = this.cashFlowFormService.createIncomeForm();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    console.log(2);
    console.log(this.form.value);
  }
}
