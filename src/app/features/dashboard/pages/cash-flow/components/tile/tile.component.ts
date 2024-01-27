
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CashFlow } from '#cash-flow/models';
import { AppPaths, DateFormats, PathFragment } from '#core/enums';
import { DashobardPaths } from '#dashboard/enums';


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

  navigateToDetails(id: string): void {
    this.router.navigate([AppPaths.DASHBOARD, DashobardPaths.CASH_FLOW, PathFragment.DETAILS, id]);
  }

}
