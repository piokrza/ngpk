import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CashFlow } from '#pages/dashboard/pages/cash-flow/models';

@Component({
  selector: 'ctrl-cash-flow-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {
  @Input({ required: true }) public cashFlowData!: CashFlow[];
  @Input({ required: true }) public isIncomeMode!: boolean;
  @Input({ required: true }) public isLoading!: boolean;
  @Input({ required: true }) public totalCashFlowAmount!: number;

  @Output() public cashFlowToRemoveId: EventEmitter<string> = new EventEmitter<string>();
  @Output() public cashFlowToUpdate: EventEmitter<CashFlow> = new EventEmitter<CashFlow>();
  @Output() public cashFlowSubmitData: EventEmitter<CashFlow> = new EventEmitter<CashFlow>();
}
