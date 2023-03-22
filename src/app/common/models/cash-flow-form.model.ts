import { FormControl } from '@angular/forms';

export interface CashFlowForm {
  name: FormControl<string>;
  amount: FormControl<0>;
  date: FormControl<Date | null>;
  category: FormControl<string>;
  description: FormControl<string>;
}
