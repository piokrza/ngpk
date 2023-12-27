import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, exhaustMap, map, of, takeUntil } from 'rxjs';

import { ToastStatus } from '#common/enums';
import { DbSubscriptionService, ToastService } from '#common/services';
import { TaskerActions } from '#store/tasker';
import { TaskerApiService } from '#tasker/services';

@Injectable()
export class TaskerEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly taskerApiService: TaskerApiService = inject(TaskerApiService);
  private readonly dbSubscriptionService: DbSubscriptionService = inject(DbSubscriptionService);

  public getTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.getTasks),
      exhaustMap(({ uid }) => {
        return this.taskerApiService.loadTasks$(uid).pipe(
          map((tasks) => TaskerActions.getTasksSuccess({ tasks })),
          takeUntil(this.dbSubscriptionService.unsubscribe$),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('fetchTasks'));
            return of(TaskerActions.getTasksError());
          })
        );
      })
    );
  });

  public addTask$ = createEffect(() => {
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

  public toggleIsTaskComplete$ = createEffect(() => {
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

  public toggleIsStepComplete$ = createEffect(() => {
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

  public removeTask$ = createEffect(() => {
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

  public getNotes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.getNotes),
      exhaustMap(({ uid }) => {
        return this.taskerApiService.loadNotes$(uid).pipe(
          map((notes) => TaskerActions.getNotesSuccess({ notes })),
          takeUntil(this.dbSubscriptionService.unsubscribe$),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('fetchNotes'));
            return of(TaskerActions.getNotesError());
          })
        );
      })
    );
  });

  public addNote$ = createEffect(() => {
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

  public removeNote$ = createEffect(() => {
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
