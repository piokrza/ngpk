import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { connectState } from '#core/utils';
import { TaskerSelectors } from '#tasker/store';

@Component({
  selector: 'org-board-list',
  templateUrl: './board-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BoardListComponent {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  readonly state = connectState(this.destroyRef, {
    boards: this.store.select(TaskerSelectors.boards),
    isLoading: this.store.select(TaskerSelectors.isLoading),
  });
}
