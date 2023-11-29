import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, combineLatest, map, tap } from 'rxjs';

import { BaseDialogStyles } from '#common/constants';
import { TaskerActions, TaskerSelectors } from '#store/tasker';
import { NoteFormComponent, TaskFormComponent } from '#tasker/components';
import { TaskerService } from '#tasker/data-access';
import { Note, Task, TaskFilter, TaskerDataset, ToggleIsStepCompletePayload } from '#tasker/models';

@Injectable()
export class TaskerFacade {
  private readonly store: Store = inject(Store);
  private readonly taskerService: TaskerService = inject(TaskerService);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);

  public get taskerDataset$(): Observable<TaskerDataset> {
    return combineLatest({
      tasks: this.tasks$,
      notes: this.store.select(TaskerSelectors.notes),
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
    this.taskerService.removeVisibilityData();
  }

  public onFilterChange(filter: TaskFilter): void {
    this.store.dispatch(TaskerActions.setFilter({ filter }));
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

  private get tasks$(): Observable<Task[] | null> {
    return combineLatest({
      tasks: this.store.select(TaskerSelectors.tasks),
      filter: this.store.select(TaskerSelectors.filter),
    }).pipe(
      map(({ tasks, filter }) => {
        if (filter === 'completed') return (tasks ?? []).filter(({ isComplete }) => isComplete);
        if (filter === 'notCompleted') return (tasks ?? []).filter(({ isComplete }) => !isComplete);
        return tasks;
      })
    );
  }
}
