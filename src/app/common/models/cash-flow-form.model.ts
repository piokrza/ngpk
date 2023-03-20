import { FormControl } from '@angular/forms';

export interface CashFlowForm {
  name: FormControl<string>;
  amount: FormControl<string>;
  date: FormControl<Date | null>;
  category: FormControl<string>;
  description: FormControl<string>;
}
