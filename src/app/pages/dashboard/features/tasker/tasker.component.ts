import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

import { TaskerFacade } from '#pages/dashboard/features/tasker';
import { TaskFilter, TaskerDataset, ToggleIsStepCompletePayload } from '#pages/dashboard/features/tasker/models';

@UntilDestroy()
@Component({
  selector: 'ctrl-tasker',
  template: `
    @if (dataset$ | async; as dataset) {
      <ctrl-tasker-panel
        [tasks]="dataset.tasks"
        [notes]="dataset.notes"
        [filter]="dataset.filter"
        [isLoading]="dataset.isLoading"
        (addTask)="onAddTask()"
        (removeTask)="onRemoveTask($event)"
        (addNote)="onAddNote()"
        (removeNote)="onRemoveNote($event)"
        (filterChange)="onFilterChange($event)"
        (toggleIsTaskComplete)="onToggleIsTaskComplete($event)"
        (toggleIsStepComplete)="onToggleIsStepComplete($event)" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskerComponent implements OnDestroy {
  private readonly taskerFacade: TaskerFacade = inject(TaskerFacade);

  public readonly dataset$: Observable<TaskerDataset> = this.taskerFacade.taskerDataset$;

  public ngOnDestroy(): void {
    this.taskerFacade.removeStepsVisibilityData();
  }

  public onAddTask(): void {
    this.taskerFacade.addTask$().pipe(untilDestroyed(this)).subscribe();
  }

  public onRemoveTask(taskId: string): void {
    this.taskerFacade.removeTask(taskId);
  }

  public onToggleIsTaskComplete(taskId: string): void {
    this.taskerFacade.toggleIsTaskComplete(taskId);
  }

  public onToggleIsStepComplete(payload: ToggleIsStepCompletePayload): void {
    this.taskerFacade.toggleIsStepComplete(payload);
  }

  public onFilterChange(filter: TaskFilter) {
    this.taskerFacade.onFilterChange(filter);
  }

  public onAddNote(): void {
    this.taskerFacade.addNote$().pipe(untilDestroyed(this)).subscribe();
  }

  public onRemoveNote(noteId: string): void {
    this.taskerFacade.removeNote(noteId);
  }
}
