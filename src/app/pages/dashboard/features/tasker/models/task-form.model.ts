import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface TaskForm {
  name: FormControl<string>;
  isComplete: FormControl<boolean>;
  steps: FormArray<FormGroup<StepForm>>;
}

export type StepForm = Omit<TaskForm, 'steps'>;
