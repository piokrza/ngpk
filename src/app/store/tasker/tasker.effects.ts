import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { ToastStatus } from '#common/enums';
import { ToastService } from '#common/services';
import { TaskerApi } from '#pages/dashboard/features/tasker/data-access';
import { TaskerActions } from '#store/tasker';

@Injectable()
export class TaskerEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly taskerApi: TaskerApi = inject(TaskerApi);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly translateService: TranslateService = inject(TranslateService);

  public getTasksUserData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.getTaskerUserData),
      exhaustMap(({ uid }) => {
        return this.taskerApi.loadTaskerUserData$(uid).pipe(
          map((data) => TaskerActions.getTaskerUserDataSuccess(data)),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('fetchTasks'));
            return of(TaskerActions.getTaskerUserDataError());
          })
        );
      })
    );
  });

  public addTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.addTask),
      exhaustMap(({ task }) => {
        return of(this.taskerApi.addTask(task)).pipe(
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
        return this.taskerApi.toggleIsTaskComplete(taskId).pipe(
          map(() => TaskerActions.toggleIsTaskCompleteSuccess()),
          catchError(() => {
            return of(TaskerActions.toggleIsTaskCompleteFailure());
          })
        );
      })
    );
  });

  public toggleIsStepComplete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.toggleIsStepComplete),
      exhaustMap(({ payload }) => {
        return this.taskerApi.toggleIsStepComplete(payload).pipe(
          map(() => TaskerActions.toggleIsStepCompleteSuccess()),
          catchError(() => {
            return of(TaskerActions.toggleIsTaskCompleteFailure());
          })
        );
      })
    );
  });

  public removeTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.removeTask),
      exhaustMap(({ taskId }) => {
        return of(this.taskerApi.removeTask(taskId)).pipe(
          map(() => TaskerActions.removeTaskSuccess()),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('removeTaskError'));
            return of(TaskerActions.removeTaskFailure());
          })
        );
      })
    );
  });

  public addNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.addNote),
      exhaustMap(({ note }) => {
        return of(this.taskerApi.addNote(note)).pipe(
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
        return of(this.taskerApi.removeNote(noteId)).pipe(
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
