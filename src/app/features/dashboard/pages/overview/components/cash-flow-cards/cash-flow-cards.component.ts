import { AsyncPipe, DecimalPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, filter, map } from 'rxjs';

import { CardModule } from 'primeng/card';

import { LabeledData } from '#common/models';
import { ContainerComponent } from '#shared/components';
import { AuthSelectors } from '#store/auth';

const imports = [CardModule, NgClass, RouterLink, TranslateModule, DecimalPipe, ContainerComponent, AsyncPipe];

@Component({
  selector: 'org-cash-flow-cards',
  templateUrl: './cash-flow-cards.component.html',
  styleUrls: ['./cash-flow-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class CashFlowCardsComponent {
  @Input({ required: true }) cashFlowDataset: LabeledData<number>[] | null = null;

  @Output() navigate = new EventEmitter<string>();

  readonly currency$: Observable<string> = inject(Store)
    .select(AuthSelectors.user)
    .pipe(
      filter(Boolean),
      map(({ config }) => config.currency)
    );
}
