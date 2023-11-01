import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-tasker-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {}
