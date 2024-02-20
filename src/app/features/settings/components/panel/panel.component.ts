import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'org-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {}
