import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardViewComponent {}
