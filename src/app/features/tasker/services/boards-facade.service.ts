import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppPaths } from '#core/enums';
import { ObservableDictionary } from '#core/models';
import { BoardsState } from '#tasker/models';
import { TaskerActions, TaskerSelectors } from '#tasker/store';

@Injectable()
export class BoardsFacadeService {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  get state(): ObservableDictionary<BoardsState> {
    return {
      boards: this.store.select(TaskerSelectors.boards),
      isLoading: this.store.select(TaskerSelectors.isLoading),
    };
  }

  navigateToDetails(id: string): void {
    this.store.dispatch(TaskerActions.setActiveBoard({ id }));
    this.router.navigate([AppPaths.TASKER, id]);
  }
}
