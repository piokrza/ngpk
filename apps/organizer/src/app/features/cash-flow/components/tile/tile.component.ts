import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CashFlow } from '#cash-flow/models';
import { AppPaths, DateFormats, PathFragment } from '@ngpk/core/enum';

@Component({
  selector: 'org-tile',
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileComponent {
  private readonly router = inject(Router);

  @Input({ required: true }) details!: CashFlow;
  @Input({ required: true }) isIncomeMode!: boolean;

  @Output() removeCashFlow = new EventEmitter<string>();
  @Output() updateCashFlow = new EventEmitter<CashFlow>();

  readonly DateFormats: typeof DateFormats = DateFormats;

  navigateToDetails(): void {
    this.router.navigate([AppPaths.CASH_FLOW, PathFragment.DETAILS, this.details.id]);
  }
}
