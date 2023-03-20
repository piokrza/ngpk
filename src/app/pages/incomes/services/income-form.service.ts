import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeForm } from '@incomes/models/income-form.model';

@Injectable()
export class IncomeFormService {
  private fb: FormBuilder = inject(FormBuilder);

  public createIncomeForm(): FormGroup<IncomeForm> {
    return this.fb.group<IncomeForm>({
      name: this.fb.nonNullable.control('', { validators: [Validators.required] }),
      amount: this.fb.nonNullable.control('', { validators: [Validators.required] }),
      date: this.fb.control(null, { validators: [Validators.required] }),
      description: this.fb.nonNullable.control(''),
    });
  }
}
