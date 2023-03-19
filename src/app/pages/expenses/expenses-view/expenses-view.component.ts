import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cctrl-expenses-view',
  templateUrl: './expenses-view.component.html',
  styleUrls: ['./expenses-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpensesViewComponent {

}
