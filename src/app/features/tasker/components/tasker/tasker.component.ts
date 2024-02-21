import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'org-tasker',
  template: `<h1>Tasker działa</h1>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskerComponent {}
