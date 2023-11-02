import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';

import { Task, TaskForm } from '#features/tasker/models';
import { TaskFormService } from '#features/tasker/services';

@Component({
  selector: 'ctrl-task-section',
  templateUrl: './task-section.component.html',
  styleUrls: ['./task-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskSectionComponent {
  private readonly taskFormService = inject(TaskFormService);

  @Input({ required: true }) tasks!: Task[];

  @Output() editTask = new EventEmitter<Task>();
  @Output() removeTask = new EventEmitter<string>();
  @Output() addTaskClick = new EventEmitter<string>();

  public readonly form: FormGroup<TaskForm> = this.taskFormService.form;
  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  public addTask(): void {
    this.addTaskClick.emit(this.nameControl.value);
    this.nameControl.reset();
  }

  public get nameControl(): FormControl<string> {
    return this.form.controls.name;
  }
}
