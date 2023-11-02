import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Task, TaskForm } from '#features/tasker/models';

@Injectable({ providedIn: 'root' })
export class TaskFormService {
  public get form(): FormGroup<TaskForm> {
    return this.createAddTaskForm();
  }

  private createAddTaskForm(): FormGroup<TaskForm> {
    return new FormGroup<TaskForm>({
      name: new FormControl<string>('', { nonNullable: true }),
      isComplete: new FormControl<boolean>(false, { nonNullable: true }),
      steps: new FormControl<Task[]>([], { nonNullable: true }),
    });
  }
}
