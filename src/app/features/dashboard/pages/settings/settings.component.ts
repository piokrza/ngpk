import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'org-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {}
