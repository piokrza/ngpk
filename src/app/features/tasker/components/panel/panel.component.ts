import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Task } from '#features/tasker/models';

@Component({
  selector: 'ctrl-tasker-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {
  @Input({ required: true }) tasks!: Task[];

  @Output() addTaskClick = new EventEmitter<string>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() removeTask = new EventEmitter<string>();
}
