import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { Nullable } from 'primeng/ts-helpers';

import { ChartConfig } from '#overview/models';
import { ContainerComponent } from '#shared/components';

const imports = [ChartModule, ContainerComponent, TranslateModule];

@Component({
  selector: 'org-cash-flow-chart',
  templateUrl: './cash-flow-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class CashFlowChartComponent {
  @Input({ required: true }) chartDataset: Nullable<ChartConfig>;
}
