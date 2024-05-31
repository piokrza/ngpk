import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import { Nullable } from 'primeng/ts-helpers';
import { Observable } from 'rxjs';

import { ConfigSelectors } from '@ngpk/organizer/state/config';

const imports = [ChartModule, TranslateModule, AsyncPipe];

@Component({
  selector: 'ngpk-chart',
  templateUrl: './chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class ChartComponent {
  @Input() title: string = '';
  @Input() chartDataset: Nullable<ChartData>;

  readonly currency$: Observable<string> = inject(Store).select(ConfigSelectors.currency);

  get chartOptions(): ChartOptions {
    return { plugins: { legend: { display: false } } };
  }
}
