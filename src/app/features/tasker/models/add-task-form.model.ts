import { FormControl } from '@angular/forms';

import { Task } from '#features/tasker/models';

export interface AddTaskForm {
  name: FormControl<string>;
  isComplete: FormControl<boolean>;
  createDate: FormControl<Date>;
  steps?: FormControl<Task[]>;
}
