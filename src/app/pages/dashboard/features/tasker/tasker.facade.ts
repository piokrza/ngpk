import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, combineLatest, map, tap } from 'rxjs';

import { BaseDialogStyles } from '#common/constants';
import { TaskFormComponent } from '#pages/dashboard/features/tasker/components';
import { TaskService } from '#pages/dashboard/features/tasker/data-access';
import { Task, TaskFilter, TaskerDataset, ToggleIsStepCompletePayload } from '#pages/dashboard/features/tasker/models';
import { TaskerActions, TaskerSelectors } from '#store/tasker';

@Injectable()
export class TaskerFacade {
  private readonly store: Store = inject(Store);
  private readonly taskService: TaskService = inject(TaskService);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);

  public get taskerDataset$(): Observable<TaskerDataset> {
    return combineLatest({
      tasks: this.tasks$,
      isLoading: this.store.select(TaskerSelectors.isLoading),
      filter: this.store.select(TaskerSelectors.filter),
    });
  }

  public addTask$(): Observable<Task | undefined> {
    const dialogRef: DynamicDialogRef = this.dialogService.open(TaskFormComponent, {
      header: this.translateService.instant('tasker.addTask'),
      style: { ...BaseDialogStyles },
    });

    return dialogRef.onClose.pipe(
      tap((task?: Task) => {
        task && this.store.dispatch(TaskerActions.addTask({ task }));
      })
    );
  }

  public removeTask(taskId: string): void {
    this.confirmationService.confirm({
      message: this.translateService.instant('tasker.removeMessage'),
      header: this.translateService.instant('tasker.removeHeader'),
      icon: PrimeIcons.TRASH,
      accept: (): void => this.store.dispatch(TaskerActions.removeTask({ taskId })),
    });
  }

  public toggleIsTaskComplete(taskId: string): void {
    this.store.dispatch(TaskerActions.toggleIsTaskComplete({ taskId }));
  }

  public toggleIsStepComplete(payload: ToggleIsStepCompletePayload) {
    this.store.dispatch(TaskerActions.toggleIsStepComplete({ payload }));
  }

  public removeStepsVisibilityData(): void {
    this.taskService.removeVisibilityData();
  }

  public onFilterChange(filter: TaskFilter): void {
    this.store.dispatch(TaskerActions.setFilter({ filter }));
  }

  private get tasks$(): Observable<Task[]> {
    return combineLatest({
      tasks: this.store.select(TaskerSelectors.tasks),
      filter: this.store.select(TaskerSelectors.filter),
    }).pipe(
      map(({ tasks, filter }) => {
        if (filter === 'completed') return tasks.filter(({ isComplete }) => isComplete);
        if (filter === 'notCompleted') return tasks.filter(({ isComplete }) => !isComplete);
        return tasks;
      })
    );
  }
}
