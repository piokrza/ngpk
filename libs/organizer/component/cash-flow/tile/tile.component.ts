import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

import { DateFormats } from '@ngpk/core/enum';
import { TimestampPipe } from '@ngpk/core/pipe';
import { DetailsBoxComponent } from '@ngpk/organizer/component/cash-flow';
import { OrganizerPaths, OrganizerPathFragment } from '@ngpk/organizer/enum';
import { CashFlow } from '@ngpk/organizer/model';
import { ContainerComponent } from '@ngpk/shared-ui/components';

const imports = [TitleCasePipe, DetailsBoxComponent, ContainerComponent, TimestampPipe];

@Component({
  selector: 'ngpk-tile',
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
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
