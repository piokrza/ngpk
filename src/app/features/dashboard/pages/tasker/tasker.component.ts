import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PrimeIcons } from 'primeng/api';
import { SelectButtonChangeEvent } from 'primeng/selectbutton';
import { ToggleButtonChangeEvent } from 'primeng/togglebutton';
import { Observable } from 'rxjs';

import { LabeledData } from '#common/models';
import { NotesData, TaskFilter, TasksData, ToggleIsStepCompletePayload } from '#tasker/models';
import { TaskerFacadeService } from '#tasker/services';

@UntilDestroy()
@Component({
  selector: 'ctrl-tasker',
  templateUrl: './tasker.component.html',
  styleUrl: './tasker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskerComponent {
  private readonly taskerFacade: TaskerFacadeService = inject(TaskerFacadeService);

  public readonly tasksData$: Observable<TasksData> = this.taskerFacade.tasksData$;
  public readonly isTasksLoading$: Observable<boolean> = this.taskerFacade.isTasksLoading$;

  public readonly notesData$: Observable<NotesData> = this.taskerFacade.notesData$;
  public readonly isNotesLoading$: Observable<boolean> = this.taskerFacade.isNotesLoading$;

  public readonly activeTabIndex$: Observable<number> = this.taskerFacade.activeTabIndex$;

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  public readonly filters: Array<LabeledData<TaskFilter>> = this.taskerFacade.taskFilters;

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

  public taskFilterChange({ value }: SelectButtonChangeEvent) {
    this.taskerFacade.onTaskFilterChange(value);
  }

  public noteFilterChange({ checked }: ToggleButtonChangeEvent): void {
    this.taskerFacade.onNoteFilterChange(checked ? 'newest' : 'oldest');
  }

  public addNote(): void {
    this.taskerFacade.addNote$().pipe(untilDestroyed(this)).subscribe();
  }

  public removeNote(noteId: string): void {
    this.taskerFacade.removeNote(noteId);
  }
}
