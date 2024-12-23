import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, exhaustMap, from, map, of, takeUntil } from 'rxjs';

import { ToastService } from '@ngpk/core/service';
import { BoardsApiService } from '@ngpk/organizer/api';
import { OrganizerPaths } from '@ngpk/organizer/enum';
import { FirestoreDbSubscriptionService } from '@ngpk/organizer/service/shared';
import { TaskerActions } from '@ngpk/organizer/state/tasker';

@Injectable()
export class TaskerEffects {
  readonly #router = inject(Router);
  readonly #actions$ = inject(Actions);
  readonly #toastService = inject(ToastService);
  readonly #translateService = inject(TranslateService);
  readonly #boardsApiService = inject(BoardsApiService);
  readonly #firestoreDbSubscriptionService = inject(FirestoreDbSubscriptionService);

  readonly #tr = (path: string) => this.#translateService.instant('toastMessage.' + path);

  loadBoards$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(TaskerActions.loadBoards),
      exhaustMap(({ uid }) => {
        return this.#boardsApiService.loadBoards$(uid).pipe(
          map((boards) => TaskerActions.loadBoardsSuccess({ boards })),
          takeUntil(this.#firestoreDbSubscriptionService.unsubscribe$),
          catchError(() => {
            this.#toastService.showMessage('error', 'Error!', 'Something went wrong during fetching boards data');
            return of(TaskerActions.loadBoardsFailure());
          })
        );
      })
    );
  });

  addBoard$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(TaskerActions.addBoard),
      exhaustMap(({ uid, name }) => {
        return from(this.#boardsApiService.addBoard(name, uid)).pipe(
          map(() => {
            this.#toastService.showMessage('success', this.#tr('success'), this.#tr('addBoardSuccess'));
            return TaskerActions.addBoardSuccess();
          }),
          catchError(() => of(TaskerActions.addBoardFailure()))
        );
      })
    );
  });

  deleteBoard$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(TaskerActions.deleteBoard),
      exhaustMap(({ boardId }) => {
        return from(this.#boardsApiService.deleteBoard(boardId)).pipe(
          map(() => {
            this.#toastService.showMessage('success', this.#tr('success'), this.#tr('deleteBoardSuccess'));
            this.#router.navigate([OrganizerPaths.TASKER]);
            return TaskerActions.deleteBoardSuccess();
          }),
          catchError(() => of(TaskerActions.deleteBoardFailure()))
        );
      })
    );
  });

  addTaskList$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(TaskerActions.addTaskList),
      exhaustMap(({ boardId, taskListName }) => {
        return this.#boardsApiService.addTaskList$(boardId, taskListName).pipe(
          map(() => TaskerActions.addTaskListSuccess()),
          catchError(() => of(TaskerActions.addTaskListFailure()))
        );
      })
    );
  });

  deleteTaskList$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(TaskerActions.deleteTaskList),
      exhaustMap(({ boardId, taskListId }) => {
        return this.#boardsApiService.deleteTaskList$(boardId, taskListId).pipe(
          map(() => TaskerActions.deleteTaskListSuccess()),
          catchError(() => of(TaskerActions.deleteTaskListFailure()))
        );
      })
    );
  });

  addTask$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(TaskerActions.addTask),
      exhaustMap(({ payload }) => this.#boardsApiService.addTask$(payload)),
      map(() => TaskerActions.addTaskSuccess())
    );
  });

  deleteTask$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(TaskerActions.deleteTask),
      exhaustMap(({ payload }) =>
        this.#boardsApiService.deleteTask$(payload).pipe(
          map(() => TaskerActions.deleteTaskSuccess()),
          catchError(() => of(TaskerActions.deleteTaskFailure()))
        )
      )
    );
  });

  dragDropTask$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(TaskerActions.dragDropTask),
      exhaustMap(({ payload }) =>
        this.#boardsApiService.dragDropTask$(payload).pipe(
          map(() => TaskerActions.dragDropTaskSuccess()),
          catchError(() => of(TaskerActions.dragDropTaskFailure()))
        )
      )
    );
  });
}
