import { FormControl } from '@angular/forms';

import { Task } from '#features/tasker/models';

export interface TaskForm {
  name: FormControl<string>;
  isComplete: FormControl<boolean>;
  steps: FormControl<Task[]>;
}
