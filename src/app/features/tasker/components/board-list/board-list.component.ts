import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { PrimeIcons } from 'primeng/api';

import { connectState } from '#core/utils';
import { ContainerComponent } from '#shared/components';
import { AddTaskBtnComponent } from '#tasker/components';
import { BoardsFacadeService } from '#tasker/services';

const imports = [ContainerComponent, TranslateModule, AddTaskBtnComponent];

@Component({
  selector: 'org-board-list',
  templateUrl: './board-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class BoardListComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly boardsFacadeService = inject(BoardsFacadeService);

  readonly state = connectState(this.destroyRef, this.boardsFacadeService.state);

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  navigateToDetails(id: string): void {
    this.boardsFacadeService.navigateToDetails(id);
  }

  addBoard(boardName: string): void {
    this.boardsFacadeService.addBoard(boardName, this.state.userId);
  }
}
