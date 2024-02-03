import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, combineLatest, map, tap } from 'rxjs';

import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { baseDialogStyles } from '#core/constants';
import { LabeledData } from '#core/models';
import { NoteFormComponent, TaskFormComponent } from '#tasker/components';
import { Note, NoteFilter, NotesData, Task, TaskFilter, TasksData, ToggleIsStepCompletePayload } from '#tasker/models';
import { TaskerService } from '#tasker/services';
import { TaskerActions, TaskerSelectors } from '#tasker/store';

@Injectable()
export class TaskerFacadeService {
  private readonly store = inject(Store);
  private readonly taskerService = inject(TaskerService);
  private readonly dialogService = inject(DialogService);
  private readonly translateService = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);

  get tasksData$(): Observable<TasksData> {
    return combineLatest({
      tasks: this.store.select(TaskerSelectors.tasks),
      filter: this.store.select(TaskerSelectors.taskFilter),
    }).pipe(map((tasksData) => this.filterTasks(tasksData)));
  }

  get isTasksLoading$(): Observable<boolean> {
    return this.store.select(TaskerSelectors.isTasksLoading);
  }

  get taskFilters(): LabeledData<TaskFilter>[] {
    return this.taskerService.taskFilters;
  }

  get activeTabIndex$(): Observable<number> {
    return this.taskerService.activeTabIndex$;
  }

  get notesData$(): Observable<NotesData> {
    return combineLatest({
      notes: this.store.select(TaskerSelectors.notes),
      filter: this.store.select(TaskerSelectors.noteFilter),
    }).pipe(
      map(({ notes, filter }) => ({
        notes: this.sortNotes(notes, filter),
        filter: filter === 'newest' ? true : false,
      }))
    );
  }

  get isNotesLoading$(): Observable<boolean> {
    return this.store.select(TaskerSelectors.isNotesLoading);
  }

  addTask$(): Observable<Task | undefined> {
    const dialogRef: DynamicDialogRef = this.dialogService.open(TaskFormComponent, {
      header: this.tr('addTask'),
      style: baseDialogStyles,
    });

    return dialogRef.onClose.pipe(
      tap((task?: Task) => {
        task && this.store.dispatch(TaskerActions.addTask({ task }));
      })
    );
  }

  editTask$(task: Task): Observable<Task | undefined> {
    const dialogRef: DynamicDialogRef = this.dialogService.open(TaskFormComponent, {
      header: `${this.tr('editTask')}: ${task.name}`,
      style: baseDialogStyles,
      data: task,
    });

    return dialogRef.onClose.pipe(
      tap((editedTask?: Task) => {
        editedTask && this.store.dispatch(TaskerActions.editTask({ editedTask }));
      })
    );
  }

  removeTask(taskId: string): void {
    this.confirmationService.confirm({
      message: this.tr('removeMessage'),
      header: this.tr('removeHeader'),
      icon: PrimeIcons.TRASH,
      accept: (): void => this.store.dispatch(TaskerActions.removeTask({ taskId })),
    });
  }

  toggleIsTaskComplete(taskId: string): void {
    this.store.dispatch(TaskerActions.toggleIsTaskComplete({ taskId }));
  }

  toggleIsStepComplete(payload: ToggleIsStepCompletePayload): void {
    this.store.dispatch(TaskerActions.toggleIsStepComplete({ payload }));
  }

  onTaskFilterChange(taskFilter: TaskFilter): void {
    this.store.dispatch(TaskerActions.setTaskFilter({ taskFilter }));
  }

  addNote$(): Observable<Note | undefined> {
    const dialogRef = this.dialogService.open(NoteFormComponent, {
      header: this.tr('addNote'),
      style: baseDialogStyles,
    });

    return dialogRef.onClose.pipe(
      tap((note?: Note) => {
        note && this.store.dispatch(TaskerActions.addNote({ note }));
      })
    );
  }

  removeNote(noteId: string): void {
    this.confirmationService.confirm({
      message: this.tr('removeNoteMessage'),
      header: this.tr('removeNoteHeader'),
      icon: PrimeIcons.TRASH,
      accept: (): void => this.store.dispatch(TaskerActions.removeNote({ noteId })),
    });
  }

  onNoteFilterChange(noteFilter: NoteFilter): void {
    this.store.dispatch(TaskerActions.setNoteFilter({ noteFilter }));
  }

  setActiveTabIdx(idx: number): void {
    this.taskerService.setActiveTabIndex(idx);
  }

  private tr(path: string): string {
    return this.translateService.instant(`tasker.${path}`);
  }

  private filterTasks({ tasks, filter }: TasksData): TasksData {
    if (filter === 'all') {
      return { tasks, filter };
    } else {
      return {
        tasks: tasks.filter(({ isComplete }) => (filter === 'completed' ? isComplete : !isComplete)),
        filter,
      };
    }
  }

  private sortNotes(notes: Note[], filter: NoteFilter): Note[] {
    const clonedNotes: Note[] = [...notes];

    return clonedNotes.sort((a, b) => {
      const dateA = a.createDate.toDate().getTime();
      const dateB = b.createDate.toDate().getTime();
      return filter === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }
}
