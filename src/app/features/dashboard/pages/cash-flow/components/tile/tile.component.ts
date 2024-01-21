import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { PrimeIcons } from 'primeng/api';

import { CashFlow } from '#cash-flow/models';
import { DateFormats } from '#core/enums';

@Component({
  selector: 'org-tile',
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileComponent {
  @Input({ required: true }) details!: CashFlow;
  @Input({ required: true }) isIncomeMode!: boolean;

  @Output() removeCashFlow = new EventEmitter<string>();
  @Output() updateCashFlow = new EventEmitter<CashFlow>();

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly DateFormats: typeof DateFormats = DateFormats;
}
