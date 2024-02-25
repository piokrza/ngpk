import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { PrimeIcons } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

import { connectState } from '#core/utils';
import { ContainerComponent } from '#shared/components';
import { BoardsFacadeService } from '#tasker/services';

const imports = [ContainerComponent, TooltipModule, TranslateModule];

@Component({
  selector: 'org-board-list',
  templateUrl: './board-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class BoardListComponent {
  private readonly boardsFacadeService = inject(BoardsFacadeService);
  private readonly destroyRef = inject(DestroyRef);

  readonly state = connectState(this.destroyRef, this.boardsFacadeService.state);
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  navigateToDetails(id: string): void {
    this.boardsFacadeService.navigateToDetails(id);
  }

  addBoard(): void {}
}
