import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { Task } from '#features/tasker/models';

@Component({
  selector: 'ctrl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;

  @Output() editTask = new EventEmitter<Task>();
  @Output() removeTask = new EventEmitter<string>();

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
}
