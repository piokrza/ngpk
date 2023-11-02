import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { TaskerApi } from '#common/api';
import { ToastStatus } from '#common/enums';
import { ToastService } from '#common/services';
import { Task } from '#features/tasker/models';
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
          map(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, this.tr('success'), this.tr('addTaskSuccess'));
            return TaskerActions.addTaskSuccess();
          }),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('addTaskError'));
            return of(TaskerActions.addTaskFailure());
          })
        );
      })
    );
  });

  private tr(path: string): string {
    return this.translateService.instant('toastMessage.' + path);
  }
}
