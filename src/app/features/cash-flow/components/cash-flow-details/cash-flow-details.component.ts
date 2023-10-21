import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CashFlow } from '@features/cash-flow/models';

@Component({
  selector: 'ctrl-cash-flow-details',
  templateUrl: './cash-flow-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowDetailsComponent {
  @Input() public details!: CashFlow;
  @Input() public isIncomeMode!: boolean;

  @Output() public cashFlowToRemoveId: EventEmitter<string> = new EventEmitter<string>();
  @Output() public cashFlowToUpdate: EventEmitter<CashFlow> = new EventEmitter<CashFlow>();
}
