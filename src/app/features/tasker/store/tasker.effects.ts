import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, exhaustMap, from, map, of, takeUntil } from 'rxjs';

import { AppPaths } from '#app/core/enums';
import { DbSubscriptionService, ToastService } from '#core/services';
import { BoardsApiService } from '#tasker/services';
import { TaskerActions } from '#tasker/store';

@Injectable()
export class TaskerEffects {
  private readonly router = inject(Router);
  private readonly actions$ = inject(Actions);
  private readonly toastService = inject(ToastService);
  private readonly translateService = inject(TranslateService);
  private readonly boardsApiService = inject(BoardsApiService);
  private readonly dbSubscriptionService = inject(DbSubscriptionService);

  loadBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.loadBoards),
      exhaustMap(({ uid }) => {
        return this.boardsApiService.loadBoards$(uid).pipe(
          map((boards) => TaskerActions.loadBoardsSuccess({ boards })),
          takeUntil(this.dbSubscriptionService.unsubscribe$),
          catchError(() => {
            this.toastService.showMessage('error', 'Error!', 'Something went wrong during fetching boards data');
            return of(TaskerActions.loadBoardsFailure());
          })
        );
      })
    );
  });

  addBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.addBoard),
      exhaustMap(({ uid, name }) => {
        return from(this.boardsApiService.addBoard(name, uid)).pipe(
          map(() => {
            this.toastService.showMessage('success', this.tr('success'), this.tr('addBoardSuccess'));
            return TaskerActions.addBoardSuccess();
          }),
          catchError(() => of(TaskerActions.addBoardFailure()))
        );
      })
    );
  });

  deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskerActions.deleteBoard),
      exhaustMap(({ boardId }) => {
        return from(this.boardsApiService.deleteBoard(boardId)).pipe(
          map(() => {
            this.toastService.showMessage('success', this.tr('success'), this.tr('deleteBoardSuccess'));
            this.router.navigate([AppPaths.TASKER]);
            return TaskerActions.deleteBoardSuccess();
          }),
          catchError(() => of(TaskerActions.deleteBoardFailure()))
        );
      })
    );
  });

  private tr(path: string): string {
    return this.translateService.instant('toastMessage.' + path);
  }
}
