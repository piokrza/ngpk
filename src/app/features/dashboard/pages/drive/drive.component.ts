import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-drive',
  template: `<router-outlet />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriveComponent {}
