import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { TaskForm, TaskStepForm } from '#pages/dashboard/pages/tasker/models';

@Injectable({ providedIn: 'root' })
export class TaskFormService {
  public get form(): FormGroup<TaskForm> {
    return new FormGroup<TaskForm>({
      name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
      isComplete: new FormControl<boolean>(false, { nonNullable: true }),
      steps: new FormArray<FormGroup<TaskStepForm>>([]),
    });
  }

  public addStep(taskForm: FormGroup<TaskForm>): void {
    taskForm.controls.steps.push(
      new FormGroup<TaskStepForm>({
        name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
        isComplete: new FormControl<boolean>(false, { nonNullable: true }),
      })
    );
  }
}
