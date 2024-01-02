import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { Nullable } from 'primeng/ts-helpers';
import { Observable, filter, map } from 'rxjs';

import { ChartConfig } from '#overview/models';
import { ContainerComponent } from '#shared/components';
import { AuthSelectors } from '#store/auth';

const imports = [ChartModule, ContainerComponent, TranslateModule, AsyncPipe];

@Component({
  selector: 'org-cash-flow-chart',
  templateUrl: './cash-flow-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class CashFlowChartComponent {
  @Input() chartDataset: Nullable<ChartConfig>;

  readonly currency$: Observable<string> = inject(Store)
    .select(AuthSelectors.user)
    .pipe(
      filter(Boolean),
      map((user) => user.config.currency)
    );
}
