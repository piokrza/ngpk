import { DecimalPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';

import { LabeledData } from '#common/models';
import { ContainerComponent } from '#shared/components';

const imports = [CardModule, NgClass, RouterLink, TranslateModule, DecimalPipe, ContainerComponent];

@Component({
  selector: 'ctrl-cash-flow-cards',
  templateUrl: './cash-flow-cards.component.html',
  styleUrls: ['./cash-flow-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class CashFlowCardsComponent {
  @Input({ required: true }) cashFlowDataset: LabeledData<number>[] | null = null;

  @Output() navigate = new EventEmitter<string>();
}
