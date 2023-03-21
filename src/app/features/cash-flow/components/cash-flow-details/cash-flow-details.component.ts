import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CashFlow } from '@common/models/cash-flow.model';

@Component({
  selector: 'ctrl-cash-flow-details',
  templateUrl: './cash-flow-details.component.html',
  styleUrls: ['./cash-flow-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowDetailsComponent {
  @Input() public details!: CashFlow;
}
