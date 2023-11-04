import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TrackByFunction } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { trackByKey } from '#common/utils';
import { Task, TaskStep, ToggleIsStepCompletePayload } from '#features/tasker/models';

@Component({
  selector: 'ctrl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnChanges {
  @Input({ required: true }) task!: Task;

  @Output() removeTask = new EventEmitter<string>();
  @Output() toggleIsTaskComplete = new EventEmitter<string>();
  @Output() toggleIsStepComplete = new EventEmitter<ToggleIsStepCompletePayload>();

  public completedSteps = 0;
  public isStepsVisible = false;
  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  public readonly trackById: TrackByFunction<TaskStep> = trackByKey<TaskStep>('id');

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) this.completedSteps = this.task.steps.filter(({ isComplete }: TaskStep) => isComplete === true).length;
  }

  public toggleStepsVisibility(): void {
    this.isStepsVisible = !this.isStepsVisible;
  }
}
