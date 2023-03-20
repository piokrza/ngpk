import { ChangeDetectionStrategy, Component, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IncomeForm } from '@incomes/models/income-form.model';
import { IncomeFormService } from '@incomes/services/income-form.service';

@Component({
  selector: 'ctrl-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
  providers: [IncomeFormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeFormComponent {
  public form: FormGroup<IncomeForm>;

  constructor(@Self() private incomeFormService: IncomeFormService) {
    this.form = this.incomeFormService.createIncomeForm();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }
  }
}
