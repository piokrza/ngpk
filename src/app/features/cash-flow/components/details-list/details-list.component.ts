import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CashFlow } from '#features/cash-flow/models';

@Component({
  selector: 'ctrl-details-list',
  templateUrl: './details-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsListComponent {
  @Input() public cashFlowList!: CashFlow[];
  @Input() public isLoading!: boolean;
  @Input() public isIncomeMode!: boolean;

  @Output() public cashFlowToRemoveId: EventEmitter<string> = new EventEmitter<string>();
  @Output() public cashFlowToUpdate: EventEmitter<CashFlow> = new EventEmitter<CashFlow>();

  public emitCashFlowIdToRemove(cashFlowId: string): void {
    this.cashFlowToRemoveId.emit(cashFlowId);
  }

  public emitCashFlowToUpdate(cashFlow: CashFlow): void {
    this.cashFlowToUpdate.emit(cashFlow);
  }
}
