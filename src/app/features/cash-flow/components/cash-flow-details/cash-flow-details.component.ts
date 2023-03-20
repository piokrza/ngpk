import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-cash-flow-details',
  templateUrl: './cash-flow-details.component.html',
  styleUrls: ['./cash-flow-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowDetailsComponent {}
