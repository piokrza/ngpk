import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { TaskerApi } from '#common/api';
import { ToastStatus } from '#common/enums';
import { ToastService } from '#common/services';
import { Task } from '#pages/dashboard/pages/tasker/models';
import { TaskerActions } from '#store/tasker';

@Injectable()
export class TaskerEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly taskerApi: TaskerApi = inject(TaskerApi);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly translateService: TranslateService = inject(TranslateService);

  public getTasksUserData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.getTasksUserData),
      exhaustMap(({ uid }) => {
        return this.taskerApi.loadTaskerUserData$(uid).pipe(
          map((tasks: Task[]) => TaskerActions.getTasksUserDataSuccess({ tasks })),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('fetchTasks'));
            return of(TaskerActions.getTasksUserDataError());
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

  private tr(path: string): string {
    return this.translateService.instant('toastMessage.' + path);
  }
}
