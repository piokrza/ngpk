import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SelectButtonChangeEvent } from 'primeng/selectbutton';
import { Observable } from 'rxjs';

import { LabelWithData } from '#common/models';
import { TaskerFacade, TaskerService } from '#tasker/data-access';
import { TaskFilter, TaskerDataset, ToggleIsStepCompletePayload } from '#tasker/models';

@UntilDestroy()
@Component({
  selector: 'ctrl-tasker',
  templateUrl: './tasker.component.html',
  styleUrl: './tasker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskerComponent implements OnDestroy {
  private readonly taskerFacade: TaskerFacade = inject(TaskerFacade);

  public readonly dataset$: Observable<TaskerDataset> = this.taskerFacade.taskerDataset$;
  public readonly activeTabIndex$: Observable<number> = inject(TaskerService).activeTabIndex$;

  public readonly filters: Array<LabelWithData<TaskFilter>> = this.taskerFacade.filters;

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
    this.taskerFacade.onFilterChange(value);
  }

  public addNote(): void {
    this.taskerFacade.addNote$().pipe(untilDestroyed(this)).subscribe();
  }

  public removeNote(noteId: string): void {
    this.taskerFacade.removeNote(noteId);
  }
}
