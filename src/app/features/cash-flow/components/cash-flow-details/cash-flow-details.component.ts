import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CashFlow } from '#features/cash-flow/models';

@Component({
  selector: 'ctrl-cash-flow-details',
  templateUrl: './cash-flow-details.component.html',
  styleUrls: ['./cash-flow-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowDetailsComponent {
  @Input({ required: true }) details!: CashFlow;
  @Input({ required: true }) isIncomeMode!: boolean;

  @Output() cashFlowToRemoveId: EventEmitter<string> = new EventEmitter<string>();
  @Output() cashFlowToUpdate: EventEmitter<CashFlow> = new EventEmitter<CashFlow>();
}
