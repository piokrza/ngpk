import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Provider, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateModule } from '@ngx-translate/core';
import { ChartData } from 'chart.js';
import { Observable } from 'rxjs';

import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { CashFlowService } from '#cash-flow/services';
import { AppPaths, DashobardPaths } from '#core/enums';
import { LabeledData } from '#core/models';
import { CashFlowCardsComponent, CashFlowChartComponent, TaskerPanelComponent } from '#overview/components';
import { TaskerData } from '#overview/models';
import { OverviewService } from '#overview/services';

const imports = [ProgressSpinnerModule, AsyncPipe, TaskerPanelComponent, CashFlowChartComponent, CashFlowCardsComponent, TranslateModule];
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
  readonly #router: Router = inject(Router);
  readonly #overviewService: OverviewService = inject(OverviewService);
  readonly #cashFlowService: CashFlowService = inject(CashFlowService);

  readonly taskerData$: Observable<TaskerData> = this.#overviewService.taskerData$;
  readonly isLoading$: Observable<boolean> = this.#overviewService.isLoading$;
  readonly cashFlowDataset$: Observable<LabeledData<number>[]> = this.#overviewService.cashFlowData$;

  readonly incomesChartData$: Observable<ChartData | undefined> = this.#overviewService.incomesChartData$;
  readonly expensesChartData$: Observable<ChartData | undefined> = this.#overviewService.expensesChartData$;

  public quickNote(): void {
    this.#overviewService.addQuickNote$().pipe(untilDestroyed(this)).subscribe();
  }

  public navigateTo(itemLabel: string): void {
    this.#cashFlowService.setActiveTabIndex(itemLabel === 'totalExpense' ? 1 : 0);
    this.#router.navigate([AppPaths.DASHBOARD, DashobardPaths.CASH_FLOW]);
  }
}
