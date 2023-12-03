import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, combineLatest, map, tap } from 'rxjs';

import { BaseDialogStyles } from '#common/constants';
import { LabeledData } from '#common/models';
import { TaskerActions, TaskerSelectors } from '#store/tasker';
import { NoteFormComponent, TaskFormComponent } from '#tasker/components';
import { TaskerService } from '#tasker/data-access';
import { Note, Task, TaskFilter, TasksData, ToggleIsStepCompletePayload } from '#tasker/models';

@Injectable()
export class TaskerFacade {
  private readonly store: Store = inject(Store);
  private readonly taskerService: TaskerService = inject(TaskerService);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);

  public get tasksData$(): Observable<TasksData> {
    return combineLatest({
      tasks: this.store.select(TaskerSelectors.tasks),
      filter: this.store.select(TaskerSelectors.taskFilter),
    }).pipe(
      map(({ tasks, filter }) => {
        if (filter === 'completed') return { tasks: (tasks ?? []).filter(({ isComplete }) => isComplete), filter };
        if (filter === 'notCompleted') return { tasks: (tasks ?? []).filter(({ isComplete }) => !isComplete), filter };
        return { tasks, filter };
      })
    );
  }

  public get isTasksLoading$(): Observable<boolean> {
    return this.store.select(TaskerSelectors.isTasksLoading);
  }

  public get taskFilters(): LabeledData<TaskFilter>[] {
    return this.taskerService.taskFilters;
  }

  public get activeTabIndex$(): Observable<number> {
    return this.taskerService.activeTabIndex$;
  }

  public get notes$(): Observable<Note[] | null> {
    return this.store.select(TaskerSelectors.notes);
  }

  public get isNotesLoading$(): Observable<boolean> {
    return this.store.select(TaskerSelectors.isNotesLoading);
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
    this.taskerService.removeVisibilityData();
  }

  public onTaskFilterChange(taskFilter: TaskFilter): void {
    this.store.dispatch(TaskerActions.setTaskFilter({ taskFilter }));
  }

  public addNote$(): Observable<Note | undefined> {
    const dialogRef = this.dialogService.open(NoteFormComponent, {
      header: this.translateService.instant('tasker.addNote'),
      style: { ...BaseDialogStyles },
    });

    return dialogRef.onClose.pipe(
      tap((note?: Note) => {
        note && this.store.dispatch(TaskerActions.addNote({ note }));
      })
    );
  }

  public removeNote(noteId: string): void {
    this.confirmationService.confirm({
      message: this.translateService.instant('tasker.removeNoteMessage'),
      header: this.translateService.instant('tasker.removeNoteHeader'),
      icon: PrimeIcons.TRASH,
      accept: (): void => this.store.dispatch(TaskerActions.removeNote({ noteId })),
    });
  }
}
