import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'org-board-list',
  templateUrl: './board-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListComponent {}
