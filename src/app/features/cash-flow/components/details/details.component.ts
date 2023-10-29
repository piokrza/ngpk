import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { CashFlow } from '#features/cash-flow/models';

@Component({
  selector: 'ctrl-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  @Input({ required: true }) details!: CashFlow;
  @Input({ required: true }) isIncomeMode!: boolean;

  @Output() cashFlowToRemoveId: EventEmitter<string> = new EventEmitter<string>();
  @Output() cashFlowToUpdate: EventEmitter<CashFlow> = new EventEmitter<CashFlow>();

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
}
