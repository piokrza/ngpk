import { FormControl } from '@angular/forms';

export interface AccountSettingsForm {
  displayName: FormControl<string | null>;
  email: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  photoURL: FormControl<string | null>;
}
