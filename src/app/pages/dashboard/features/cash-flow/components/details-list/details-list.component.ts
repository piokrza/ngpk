import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { environment as env } from 'src/environments/environment';

import { CashFlow } from '#pages/dashboard/features/cash-flow/models';

@Component({
  selector: 'ctrl-details-list',
  templateUrl: './details-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsListComponent {
  @Input({ required: true }) public cashFlowList!: CashFlow[];
  @Input({ required: true }) public isLoading!: boolean;
  @Input({ required: true }) public isIncomeMode!: boolean;

  @Output() public cashFlowToRemoveId: EventEmitter<string> = new EventEmitter<string>();
  @Output() public cashFlowToUpdate: EventEmitter<CashFlow> = new EventEmitter<CashFlow>();

  public readonly maxItemsPerPage: number = env.maxItemPerPage;

  public emitCashFlowIdToRemove(cashFlowId: string): void {
    this.cashFlowToRemoveId.emit(cashFlowId);
  }

  public emitCashFlowToUpdate(cashFlow: CashFlow): void {
    this.cashFlowToUpdate.emit(cashFlow);
  }
}
