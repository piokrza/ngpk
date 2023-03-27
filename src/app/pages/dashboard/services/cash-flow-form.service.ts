import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CashFlowForm } from '@common/models/cash-flow-form.model';

@Injectable({ providedIn: 'root' })
export class CashFlowFormService {
  private fb: FormBuilder = inject(FormBuilder);

  public createCashFlowForm(): FormGroup<CashFlowForm> {
    return this.fb.group<CashFlowForm>({
      name: this.fb.nonNullable.control('', { validators: [Validators.required] }),
      amount: this.fb.nonNullable.control(0, { validators: [Validators.required] }),
      date: this.fb.control(null, { validators: [Validators.required] }),
      categoryCode: this.fb.nonNullable.control(0, { validators: [Validators.required] }),
      description: this.fb.nonNullable.control(''),
    });
  }
}
