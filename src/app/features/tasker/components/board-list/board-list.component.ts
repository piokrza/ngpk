import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { filter, switchMap } from 'rxjs';

import { IUser } from '#auth/models';
import { AuthSelectors } from '#auth/store';
import { connectState } from '#core/utils';
import { BoardsService } from '#tasker/services';
import { BoardsStore } from '#tasker/state';

@Component({
  selector: 'org-board-list',
  templateUrl: './board-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly boardsStore = inject(BoardsStore);
  private readonly boardsService = inject(BoardsService);

  readonly state = connectState(this.destroyRef, {
    boards: this.boardsStore.select('boards'),
    isLoading: this.boardsStore.select('isLoading'),
  });

  ngOnInit(): void {
    this.store
      .select(AuthSelectors.user)
      .pipe(
        filter(Boolean),
        switchMap(({ uid }: IUser) => this.boardsService.loadBoards$(uid)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
