import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, exhaustMap, from, map, of, takeUntil, tap } from 'rxjs';

import { ToastStatus } from '#core/enums';
import { DbSubscriptionService, ToastService } from '#core/services';
import { TaskerApiService } from '#tasker/services';
import { TaskerActions } from '#tasker/store';

@Injectable()
export class TaskerEffects {
  private readonly actions$ = inject(Actions);
  private readonly toastService = inject(ToastService);
  private readonly translateService = inject(TranslateService);
  private readonly taskerApiService = inject(TaskerApiService);
  private readonly dbSubscriptionService = inject(DbSubscriptionService);

  getTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.loadTasks),
      exhaustMap(({ uid }) => {
        return this.taskerApiService.loadTasks$(uid).pipe(
          map((tasks) => TaskerActions.loadTasksSuccess({ tasks })),
          takeUntil(this.dbSubscriptionService.unsubscribe$),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('fetchTasks'));
            return of(TaskerActions.loadTasksError());
          })
        );
      })
    );
  });

  addTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.addTask),
      exhaustMap(({ task }) => {
        return of(this.taskerApiService.addTask(task)).pipe(
          map(() => TaskerActions.addTaskSuccess()),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('addTaskError'));
            return of(TaskerActions.addTaskFailure());
          })
        );
      })
    );
  });

  toggleIsTaskComplete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.toggleIsTaskComplete),
      exhaustMap(({ taskId }) => {
        return this.taskerApiService.toggleIsTaskComplete(taskId).pipe(
          map(() => TaskerActions.toggleIsTaskCompleteSuccess()),
          catchError(() => of(TaskerActions.toggleIsTaskCompleteFailure()))
        );
      })
    );
  });

  toggleIsStepComplete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.toggleIsStepComplete),
      exhaustMap(({ payload }) => {
        return this.taskerApiService.toggleIsStepComplete(payload).pipe(
          map(() => TaskerActions.toggleIsStepCompleteSuccess()),
          catchError(() => of(TaskerActions.toggleIsTaskCompleteFailure()))
        );
      })
    );
  });

  removeTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.removeTask),
      exhaustMap(({ taskId }) => {
        return of(this.taskerApiService.removeTask(taskId)).pipe(
          map(() => TaskerActions.removeTaskSuccess()),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('removeTaskError'));
            return of(TaskerActions.removeTaskFailure());
          })
        );
      })
    );
  });

  editTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.editTask),
      exhaustMap(({ editedTask }) => {
        return from(this.taskerApiService.editTask(editedTask)).pipe(
          map(() => TaskerActions.editTaskSuccess()),
          tap(() => this.toastService.showMessage(ToastStatus.SUCCESS, this.tr('success'), this.tr('editTaskSuccess'))),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('editTaskError'));
            return of(TaskerActions.editTaskFailure());
          })
        );
      })
    );
  });

  editNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.editNote),
      exhaustMap(({ editedNote }) => {
        return from(this.taskerApiService.editNote(editedNote)).pipe(
          map(() => TaskerActions.editNoteSuccess()),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('editNoteError'));
            return of(TaskerActions.editNoteFailure());
          })
        );
      })
    );
  });

  getNotes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.loadNotes),
      exhaustMap(({ uid }) => {
        return this.taskerApiService.loadNotes$(uid).pipe(
          map((notes) => TaskerActions.loadNotesSuccess({ notes })),
          takeUntil(this.dbSubscriptionService.unsubscribe$),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('fetchNotes'));
            return of(TaskerActions.loadNotesError());
          })
        );
      })
    );
  });

  addNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.addNote),
      exhaustMap(({ note }) => {
        return of(this.taskerApiService.addNote(note)).pipe(
          map(() => TaskerActions.addNoteSuccess()),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('addNoteError'));
            return of(TaskerActions.addNoteFailure());
          })
        );
      })
    );
  });

  removeNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.removeNote),
      exhaustMap(({ noteId }) => {
        return of(this.taskerApiService.removeNote(noteId)).pipe(
          map(() => TaskerActions.removeNoteSuccess()),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('removeNoteError'));
            return of(TaskerActions.removeNoteFailure());
          })
        );
      })
    );
  });

  private tr(path: string): string {
    return this.translateService.instant('toastMessage.' + path);
  }
}