import { FormControl } from '@angular/forms';

export interface RegisterForm {
  email: FormControl<string>;
  password: FormControl<string>;
  passwordConfirmation: FormControl<string>;
}
