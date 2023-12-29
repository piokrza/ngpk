import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { environment as env } from 'src/environments/environment';

import { CashFlow } from '#cash-flow/models';

@Component({
  selector: 'ctrl-details-list',
  templateUrl: './details-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsListComponent {
  @Input({ required: true }) cashFlowList!: CashFlow[];
  @Input({ required: true }) isLoading!: boolean;
  @Input({ required: true }) isIncomeMode!: boolean;

  @Output() addCashFlow = new EventEmitter<boolean>();
  @Output() cashFlowToRemoveId = new EventEmitter<string>();
  @Output() cashFlowToUpdate = new EventEmitter<CashFlow>();

  public readonly maxItemsPerPage = env.maxItemPerPage; //TODO: add pagination
  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  public removeCashFlow(cashFlowId: string): void {
    this.cashFlowToRemoveId.emit(cashFlowId);
  }

  public updateCashFlow(cashFlow: CashFlow): void {
    this.cashFlowToUpdate.emit(cashFlow);
  }
}
