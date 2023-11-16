import { FormControl } from '@angular/forms';

export interface NoteForm {
  name: FormControl<string>;
  content: FormControl<string>;
}
