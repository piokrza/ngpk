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
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export default class TaskerComponent {}
