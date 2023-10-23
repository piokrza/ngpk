import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CashFlowForm } from '#features/cash-flow/models';

@Injectable()
export class CashFlowFormService {
  public createCashFlowForm(): FormGroup<CashFlowForm> {
    return new FormGroup({
      name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
      amount: new FormControl<number>(0, { validators: [Validators.required], nonNullable: true }),
      date: new FormControl<Date | null>(null, { validators: [Validators.required] }),
      categoryCode: new FormControl<number>(0, { validators: [Validators.required], nonNullable: true }),
      description: new FormControl<string>('', { validators: [Validators.maxLength(40)], nonNullable: true }),
    });
  }
}
