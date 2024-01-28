import { AsyncPipe, DecimalPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { CardModule } from 'primeng/card';

import { ConfigSelectors } from '#core/config/store';
import { LabeledData } from '#core/models';
import { ContainerComponent } from '#shared/components';

const imports = [CardModule, NgClass, RouterLink, TranslateModule, DecimalPipe, ContainerComponent, AsyncPipe];

@Component({
  selector: 'org-cash-flow-cards',
  templateUrl: './cash-flow-cards.component.html',
  styleUrl: './cash-flow-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class CashFlowCardsComponent {
  @Input({ required: true }) cashFlowDataset: LabeledData<number>[] | null = null;

  @Output() navigate = new EventEmitter<string>();

  readonly currency$: Observable<string> = inject(Store).select(ConfigSelectors.currency);
}
