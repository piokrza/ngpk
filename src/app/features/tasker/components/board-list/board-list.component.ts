import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppPaths } from '#app/core/enums';
import { connectState } from '#core/utils';
import { TaskerActions, TaskerSelectors } from '#tasker/store';

const imports = [RouterLink]; // Remove routerlink

@Component({
  selector: 'org-board-list',
  templateUrl: './board-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class BoardListComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly state = connectState(this.destroyRef, {
    boards: this.store.select(TaskerSelectors.boards),
    isLoading: this.store.select(TaskerSelectors.isLoading),
  });

  navigateToDetails(id: string): void {
    this.store.dispatch(TaskerActions.setActiveBoard({ id }));
    this.router.navigate([AppPaths.TASKER, id]);
  }
}
