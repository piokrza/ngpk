import { FormControl } from '@angular/forms';

export interface CashFlowForm {
  name: FormControl<string>;
  amount: FormControl<number>;
  date: FormControl<Date | null>;
  categoryId: FormControl<string>;
  description: FormControl<string>;
}
