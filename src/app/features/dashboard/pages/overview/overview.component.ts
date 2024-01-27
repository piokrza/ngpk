import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { connectState } from '#app/core/utils';
import { CashFlowService } from '#cash-flow/services';
import { AppPaths } from '#core/enums';
import { DashobardPaths } from '#dashboard/enums';
import { CashFlowCardsComponent, CashFlowChartComponent, TaskerPanelComponent } from '#overview/components';
import { OverviewService } from '#overview/services';

const imports = [ProgressSpinnerModule, AsyncPipe, TaskerPanelComponent, CashFlowChartComponent, CashFlowCardsComponent, TranslateModule];
const providers = [OverviewService];

@Component({
  selector: 'org-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers,
  imports,
})
export class OverviewComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly overviewService = inject(OverviewService);
  private readonly cashFlowService = inject(CashFlowService);

  readonly state = connectState(this.destroyRef, {
    taskerData: this.overviewService.taskerData$,
    isLoading: this.overviewService.isLoading$,
    cashFlowDataSet: this.overviewService.cashFlowData$,
    incomesChartData: this.overviewService.incomesChartData$,
    expensesChartData: this.overviewService.expensesChartData$,
  });

  addQuickNote(): void {
    this.overviewService.addQuickNote$().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  navigateToCashFlow(itemLabel: string): void {
    this.cashFlowService.setActiveTabIndex(itemLabel === 'totalExpense' ? 1 : 0);
    this.router.navigate([AppPaths.DASHBOARD, DashobardPaths.CASH_FLOW]);
  }
}
