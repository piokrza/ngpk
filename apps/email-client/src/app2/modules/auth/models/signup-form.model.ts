import { FormControl } from '@angular/forms';

export interface SignupForm {
  username: FormControl<string>;
  password: FormControl<string>;
  passwordConfirmation: FormControl<string>;
}
