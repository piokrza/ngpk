import { FormControl } from '@angular/forms';

export interface IncomeForm {
  name: FormControl<string>;
  amount: FormControl<string>;
  date: FormControl<Date | null>;
  description: FormControl<string>;
}
