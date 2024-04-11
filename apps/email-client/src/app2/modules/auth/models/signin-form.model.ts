import { FormControl } from '@angular/forms';

export interface SigninForm {
  username: FormControl<string>;
  password: FormControl<string>;
}
