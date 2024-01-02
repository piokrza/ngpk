import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { Task, TaskStep, ToggleIsStepCompletePayload } from '#tasker/models';

@Component({
  selector: 'org-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnChanges {
  @Input({ required: true }) task!: Task;

  @Output() removeTask = new EventEmitter<string>();
  @Output() toggleIsTaskComplete = new EventEmitter<string>();
  @Output() toggleIsStepComplete = new EventEmitter<ToggleIsStepCompletePayload>();

  completedSteps!: number;
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      this.completedSteps = this.task.steps.filter(({ isComplete }: TaskStep) => isComplete).length;
    }
  }
}
