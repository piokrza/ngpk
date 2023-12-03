import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SelectButtonChangeEvent } from 'primeng/selectbutton';
import { Observable } from 'rxjs';

import { LabeledData } from '#common/models';
import { TaskerFacade } from '#tasker/data-access';
import { Note, TaskFilter, TasksData, ToggleIsStepCompletePayload } from '#tasker/models';

@UntilDestroy()
@Component({
  selector: 'ctrl-tasker',
  templateUrl: './tasker.component.html',
  styleUrl: './tasker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskerComponent implements OnDestroy {
  private readonly taskerFacade: TaskerFacade = inject(TaskerFacade);

  public readonly tasksData$: Observable<TasksData> = this.taskerFacade.tasksData$;
  public readonly isTasksLoading$: Observable<boolean> = this.taskerFacade.isTasksLoading$;

  public readonly notes$: Observable<Note[] | null> = this.taskerFacade.notes$;
  public readonly isNotesLoading$: Observable<boolean> = this.taskerFacade.isNotesLoading$;

  public readonly activeTabIndex$: Observable<number> = this.taskerFacade.activeTabIndex$;

  public readonly filters: Array<LabeledData<TaskFilter>> = this.taskerFacade.taskFilters;

  public ngOnDestroy(): void {
    this.taskerFacade.removeStepsVisibilityData();
  }

  public addTask(): void {
    this.taskerFacade.addTask$().pipe(untilDestroyed(this)).subscribe();
  }

  public removeTask(taskId: string): void {
    this.taskerFacade.removeTask(taskId);
  }

  public toggleIsTaskComplete(taskId: string): void {
    this.taskerFacade.toggleIsTaskComplete(taskId);
  }

  public toggleIsStepComplete(payload: ToggleIsStepCompletePayload): void {
    this.taskerFacade.toggleIsStepComplete(payload);
  }

  public filterChange({ value }: SelectButtonChangeEvent) {
    this.taskerFacade.onTaskFilterChange(value);
  }

  public addNote(): void {
    this.taskerFacade.addNote$().pipe(untilDestroyed(this)).subscribe();
  }

  public removeNote(noteId: string): void {
    this.taskerFacade.removeNote(noteId);
  }
}
