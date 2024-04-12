import { AsyncPipe, DecimalPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';

import { ConfigSelectors } from '@ngpk/auth-organizer/config/store';
import { CashFlowDataSet } from '@ngpk/cash-flow/model';
import { LabeledData } from '@ngpk/core/model';
import { ContainerComponent } from '@ngpk/shared-ui/components';

const imports = [CardModule, NgClass, RouterLink, TranslateModule, DecimalPipe, ContainerComponent, AsyncPipe];

@Component({
  selector: 'ngpk-cash-flow-cards',
  templateUrl: './cash-flow-cards.component.html',
  styleUrl: './cash-flow-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class CashFlowCardsComponent {
  @Input({ required: true }) cashFlowDataset: LabeledData<CashFlowDataSet>[] | null = null;

  @Output() setTabIdx = new EventEmitter();

  readonly currency$: Observable<string> = inject(Store).select(ConfigSelectors.currency);

  itemClick(isIncome: boolean | null): void {
    if (isIncome === null) return;

    const tabIndex = isIncome ? 1 : 2;
    this.setTabIdx.emit({ index: tabIndex });
  }
}
