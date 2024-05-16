import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

import { OrganizerPaths, DateFormats, OrganizerPathFragment } from '@ngpk/core/enum';
import { CashFlow } from '@ngpk/organizer/model';

@Component({
  selector: 'ngpk-tile',
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
    this.router.navigate([OrganizerPaths.CASH_FLOW, OrganizerPathFragment.DETAILS, this.details.id]);
  }
}
