import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface TaskForm {
  name: FormControl<string>;
  isComplete: FormControl<boolean>;
  steps: FormArray<FormGroup<TaskStepForm>>;
}

export type TaskStepForm = Omit<TaskForm, 'steps'>;
