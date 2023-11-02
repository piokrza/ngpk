import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { TaskForm } from '#features/tasker/models';
import { TaskFormService } from '#features/tasker/services';

@Component({
  selector: 'ctrl-task-form',
  templateUrl: './task-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  private readonly taskFormService: TaskFormService = inject(TaskFormService);

  public readonly form: FormGroup<TaskForm> = this.taskFormService.form;

  public get nameControl(): FormControl<string> {
    return this.form.controls.name;
  }

  public get isCompleteControl(): FormControl<boolean> {
    return this.form.controls.isComplete;
  }
}
