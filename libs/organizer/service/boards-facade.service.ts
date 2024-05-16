import { Location } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { filter, map } from 'rxjs';

import { OrganizerPaths } from '@ngpk/core/enum';
import { AddTaskPayload, DeleteTaskPayload, DragDropTaskPayload } from '@ngpk/organizer/model';
import { AuthSelectors } from '@ngpk/organizer/state/auth';
import { TaskerActions, TaskerSelectors } from '@ngpk/organizer/state/tasker';

@Injectable()
export class BoardsFacadeService {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly translateService = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);

  get boardState() {
    return {
      user: this.store.select(AuthSelectors.user).pipe(filter(Boolean)),
      board: this.store.select(TaskerSelectors.activeBoard).pipe(filter(Boolean)),
    };
  }

  get boardListState() {
    return {
      boards: this.store.select(TaskerSelectors.boards),
      isLoading: this.store.select(TaskerSelectors.isLoading),
      userId: this.store.select(AuthSelectors.user).pipe(map((user) => user?.uid ?? '')),
    };
  }

  addBoard(name: string, uid: string): void {
    this.store.dispatch(TaskerActions.addBoard({ name, uid }));
  }

  addTaskList(boardId: string, taskListName: string): void {
    this.store.dispatch(TaskerActions.addTaskList({ boardId, taskListName }));
  }

  deleteTaskList(boardId: string, taskListId: string): void {
    this.confirmationService.confirm({
      message: this.translateService.instant('tasker.deleteTaskListMessage'),
      header: this.translateService.instant('tasker.deleteTaskListHeader'),
      accept: () => this.store.dispatch(TaskerActions.deleteTaskList({ boardId, taskListId })),
    });
  }

  deleteBoard(boardId: string): void {
    this.confirmationService.confirm({
      message: this.translateService.instant('tasker.deleteBoardMessage'),
      header: this.translateService.instant('tasker.deleteBoardHeader'),
      accept: () => this.store.dispatch(TaskerActions.deleteBoard({ boardId })),
    });
  }

  navigateToDetails(id: string): void {
    this.store.dispatch(TaskerActions.setActiveBoard({ id }));
    this.router.navigate([OrganizerPaths.TASKER, id]);
  }

  addTask(payload: AddTaskPayload): void {
    this.store.dispatch(TaskerActions.addTask({ payload }));
  }

  deleteTask(payload: DeleteTaskPayload): void {
    this.confirmationService.confirm({
      message: this.translateService.instant('tasker.deleteTaskMessage'),
      header: this.translateService.instant('tasker.deleteTaskHeader'),
      accept: () => this.store.dispatch(TaskerActions.deleteTask({ payload })),
    });
  }

  dragDropTask(payload: DragDropTaskPayload): void {
    this.store.dispatch(TaskerActions.dragDropTask({ payload }));
  }

  navigateToTaskerPage(): void {
    this.router.navigate([OrganizerPaths.TASKER]);
  }

  navigateBack(): void {
    this.location.back();
  }
}
