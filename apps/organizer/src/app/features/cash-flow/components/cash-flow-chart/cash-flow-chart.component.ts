import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import { Nullable } from 'primeng/ts-helpers';
import { Observable } from 'rxjs';

import { ConfigSelectors } from '@ngpk/auth-organizer/config/store';
import { ContainerComponent } from '@ngpk/shared-ui/shared';

const imports = [ChartModule, ContainerComponent, TranslateModule, AsyncPipe];

@Component({
  selector: 'org-cash-flow-chart',
  templateUrl: './cash-flow-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class CashFlowChartComponent {
  @Input() title: string = '';
  @Input() chartDataset: Nullable<ChartData>;

  readonly currency$: Observable<string> = inject(Store).select(ConfigSelectors.currency);

  get chartOptions(): ChartOptions {
    return { plugins: { legend: { display: false } } };
  }
}
