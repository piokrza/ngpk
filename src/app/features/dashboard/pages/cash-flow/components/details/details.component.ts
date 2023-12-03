import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { CashFlow } from '#cash-flow/models';

@Component({
  selector: 'ctrl-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  @Input({ required: true }) details!: CashFlow;
  @Input({ required: true }) isIncomeMode!: boolean;

  @Output() cashFlowToRemoveId = new EventEmitter<string>();
  @Output() cashFlowToUpdate = new EventEmitter<CashFlow>();

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
}
