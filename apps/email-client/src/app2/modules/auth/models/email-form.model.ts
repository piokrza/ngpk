import { FormControl } from '@angular/forms';

export interface EmailForm {
  to: FormControl<string> | null;
  from: FormControl<string> | null;
  subject: FormControl<string> | null;
  text: FormControl<string> | null;
}
