import { FormControl, FormGroup } from '@angular/forms';

export interface FormOne {
  oneOne: FormControl<string>;
  oneTwo: FormControl<string>;
  oneThree: FormControl<string>;
}

export interface FormTwo {
  twoOne: FormControl<string>;
  twoTwo: FormControl<string>;
}

export interface Form {
  one: FormGroup<FormOne>;
  two: FormGroup<FormTwo>;
}
