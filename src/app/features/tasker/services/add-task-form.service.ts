import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AddTaskForm } from '#features/tasker/models';

@Injectable()
export class AddTaskFormService {
  private readonly form: FormGroup<AddTaskForm> = this.createAddTaskForm();

  private createAddTaskForm(): FormGroup<AddTaskForm> {
    return new FormGroup<AddTaskForm>({
      name: new FormControl<string>('', { nonNullable: true }),
      createDate: new FormControl<Date>(new Date(), { nonNullable: true }),
      isComplete: new FormControl<boolean>(false, { nonNullable: true }),
    });
  }
}
