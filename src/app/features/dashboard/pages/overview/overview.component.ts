import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Provider, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Observable } from 'rxjs';

import { CashFlowService } from '#cash-flow/services';
import { AppPaths, DashobardPaths } from '#common/enums';
import { LabeledData } from '#common/models';
import { CashFlowCardsComponent, CashFlowChartComponent, TaskerPanelComponent } from '#overview/components';
import { ChartConfig, TaskerData } from '#overview/models';
import { OverviewService } from '#overview/services';

const imports = [ProgressSpinnerModule, AsyncPipe, TaskerPanelComponent, CashFlowChartComponent, CashFlowCardsComponent];
const providers: Provider[] = [OverviewService];

@UntilDestroy()
@Component({
  selector: 'org-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers,
  imports,
})
export default class OverviewComponent {
  private readonly router: Router = inject(Router);
  private readonly overviewService: OverviewService = inject(OverviewService);
  private readonly cashFlowService: CashFlowService = inject(CashFlowService);

  public readonly taskerData$: Observable<TaskerData> = this.overviewService.taskerData$;
  public readonly cashFlowChartData$: Observable<ChartConfig | undefined> = this.overviewService.cashFlowChartData$;
  public readonly isLoading$: Observable<boolean> = this.overviewService.isLoading$;
  public readonly cashFlowDataset$: Observable<LabeledData<number>[]> = this.overviewService.cashFlowData$;

  public quickNote(): void {
    this.overviewService.addQuickNote$().pipe(untilDestroyed(this)).subscribe();
  }

  public navigateTo(itemLabel: string): void {
    this.cashFlowService.setActiveTabIndex(itemLabel === 'totalExpense' ? 1 : 0);
    this.router.navigate([AppPaths.DASHBOARD, DashobardPaths.CASH_FLOW]);
  }
}
