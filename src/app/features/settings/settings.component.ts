import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'org-settings',
  template: `<router-outlet />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {}
