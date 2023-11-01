import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Task } from '#features/tasker/models';

@Component({
  selector: 'ctrl-tasker-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {
  todos: Task[] = [
    {
      name: 'Todo name',
      isComplete: true,
      id: 'dwa',
    },
  ];
}
