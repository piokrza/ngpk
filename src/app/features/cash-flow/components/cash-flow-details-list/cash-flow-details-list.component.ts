import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() public itemToRemoveId: EventEmitter<string> = new EventEmitter<string>();

  public emitItemIdToRemove(itemId: string): void {
    this.itemToRemoveId.emit(itemId);
  }
}
