import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cctrl-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardViewComponent {

}
