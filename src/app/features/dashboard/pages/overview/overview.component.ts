import { AsyncPipe, DecimalPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Provider, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Observable } from 'rxjs';

import { CashFlowService } from '#cash-flow/data-access';
import { AppPaths } from '#common/enums';
import { LabeledData } from '#common/models';
import { DashobardPaths } from '#dashboard/enums';
import { OverviewFacade } from '#overview/data-access';
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
  NgClass,
  ButtonModule,
];
const providers: Provider[] = [OverviewFacade];

@UntilDestroy()
@Component({
  selector: 'ctrl-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers,
  imports,
})
export default class OverviewComponent {
  private readonly router: Router = inject(Router);
  private readonly overviewFacade: OverviewFacade = inject(OverviewFacade);
  private readonly cashFlowService: CashFlowService = inject(CashFlowService);

  public readonly taskerData$ = this.overviewFacade.taskerData$;
  public readonly cashFlowChartData$ = this.overviewFacade.cashFlowChartData$;
  public readonly isLoading$: Observable<boolean> = this.overviewFacade.isLoading$;
  public readonly cashFlowDataset$: Observable<LabeledData<number>[]> = this.overviewFacade.cashFlowData$;

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  public addQuickNote(): void {
    this.overviewFacade.addQuickNote$().pipe(untilDestroyed(this)).subscribe();
  }

  public navigateTo(itemLabel: string): void {
    this.cashFlowService.setActiveTabIndex(itemLabel === 'totalExpense' ? 1 : 0);
    this.router.navigate([AppPaths.DASHBOARD, DashobardPaths.CASH_FLOW]);
  }
}
