import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { ConfirmationService } from 'primeng/api';

import { AppPaths } from '#core/enums';
import { AddTaskPayload } from '#tasker/models';
import { TaskerActions } from '#tasker/store';

@Injectable()
export class BoardsFacadeService {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly translateService = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);

  addBoard(name: string, uid: string): void {
    this.store.dispatch(TaskerActions.addBoard({ name, uid }));
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
    this.router.navigate([AppPaths.TASKER, id]);
  }

  addTask(payload: AddTaskPayload): void {
    this.store.dispatch(TaskerActions.addTask({ payload }));
  }
}
