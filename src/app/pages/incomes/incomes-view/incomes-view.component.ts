import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-incomes-view',
  templateUrl: './incomes-view.component.html',
  styleUrls: ['./incomes-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomesViewComponent {}
