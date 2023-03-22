import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CashFlow } from '@common/models/cash-flow.model';

@Component({
  selector: 'ctrl-cash-flow-panel',
  templateUrl: './cash-flow-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowPanelComponent {
  @Input() public cashFlowData!: CashFlow[];
  @Input() public isIncomeMode!: boolean;
  @Input() public isLoading!: boolean;
  @Input() public totalCashFlowAmount: number = 0;

  @Output() public cashFlowSubmitData: EventEmitter<CashFlow> = new EventEmitter<CashFlow>();
  @Output() public itemToRemoveId: EventEmitter<string> = new EventEmitter<string>();

  public emitCashFlowSubmitData(cashFlowSubmitData: CashFlow): void {
    this.cashFlowSubmitData.emit(cashFlowSubmitData);
  }

  public emitItemIdToRemove(itemId: string) {
    this.itemToRemoveId.emit(itemId);
  }
}
