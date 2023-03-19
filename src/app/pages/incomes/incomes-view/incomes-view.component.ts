import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cctrl-incomes-view',
  templateUrl: './incomes-view.component.html',
  styleUrls: ['./incomes-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomesViewComponent {

}
