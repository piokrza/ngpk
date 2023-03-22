import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CashFlow } from '@common/models/cash-flow.model';

@Component({
  selector: 'ctrl-cash-flow-details-list',
  templateUrl: './cash-flow-details-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowDetailsListComponent {
  @Input() public cashFlowList!: CashFlow[];
  @Input() public isLoading!: boolean;
  @Input() public isIncomeMode!: boolean;
}
