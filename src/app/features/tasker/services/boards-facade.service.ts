import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';

import { ConfirmationService } from 'primeng/api';

import { AuthSelectors } from '#auth/store';
import { AppPaths } from '#core/enums';
import { ObservableDictionary } from '#core/models';
import { BoardsState } from '#tasker/models';
import { TaskerActions, TaskerSelectors } from '#tasker/store';

@Injectable()
export class BoardsFacadeService {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly translateService = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);

  get state(): ObservableDictionary<BoardsState> {
    return {
      boards: this.store.select(TaskerSelectors.boards),
      isLoading: this.store.select(TaskerSelectors.isLoading),
      userId: this.store.select(AuthSelectors.user).pipe(map((user) => user?.uid ?? '')),
    };
  }

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
}
