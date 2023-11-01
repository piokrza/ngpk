import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TaskerModule } from '#features/tasker';

const imports = [TaskerModule];

@Component({
  selector: 'ctrl-tasker',
  template: `
    <div>
      <ctrl-tasker-panel />
    </div>
  `,
  styleUrls: ['./tasker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export default class TaskerComponent {}
