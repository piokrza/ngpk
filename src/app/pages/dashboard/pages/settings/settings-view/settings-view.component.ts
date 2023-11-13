import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrl: './settings-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsViewComponent {}
