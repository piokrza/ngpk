import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';

import { PrimeIcons } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

import { AuthSelectors } from '#auth/store';
import { connectState } from '#core/utils';
import { ContainerComponent } from '#shared/components';
import { AddItemBtnComponent } from '#tasker/components';
import { BoardsFacadeService } from '#tasker/services';
import { TaskerSelectors } from '#tasker/store';

const imports = [ContainerComponent, TranslateModule, AddItemBtnComponent, TooltipModule];

@Component({
  selector: 'org-board-list',
  templateUrl: './board-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class BoardListComponent {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly boardsFacadeService = inject(BoardsFacadeService);

  readonly state = connectState(this.destroyRef, {
    boards: this.store.select(TaskerSelectors.boards),
    isLoading: this.store.select(TaskerSelectors.isLoading),
    userId: this.store.select(AuthSelectors.user).pipe(map((user) => user?.uid ?? '')),
  });

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  navigateToDetails(id: string): void {
    this.boardsFacadeService.navigateToDetails(id);
  }

  addBoard(boardName: string): void {
    this.boardsFacadeService.addBoard(boardName, this.state.userId);
  }
}
