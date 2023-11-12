import { AsyncPipe, DecimalPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Provider, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Observable } from 'rxjs';

import { LabelWithData } from '#common/models';
import { OverviewFacade } from '#pages/dashboard/pages/overview';
import { ContainerComponent } from '#shared/components';

const imports = [
  TranslateModule,
  RouterLink,
  CardModule,
  ChartModule,
  ContainerComponent,
  ProgressSpinnerModule,
  DecimalPipe,
  AsyncPipe,
  JsonPipe,
];
const providers: Provider[] = [OverviewFacade];

@UntilDestroy()
@Component({
  selector: 'ctrl-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers,
  imports,
})
export default class OverviewComponent {
  private readonly overviewFacade: OverviewFacade = inject(OverviewFacade);

  public readonly isLoading$: Observable<boolean> = this.overviewFacade.isLoading$;
  public readonly cashFlowDataset$: Observable<LabelWithData<number>[]> = this.overviewFacade.cashFlowData$;
  public readonly cashFlowChartData$ = this.overviewFacade.cashFlowChartData$;
}
