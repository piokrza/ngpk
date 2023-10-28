import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Observable, combineLatest, tap, map } from 'rxjs';

import { CashFlow } from '#features/cash-flow/models';
import { CustomChartData } from '#pages/dashboard/models';
import { ChartService } from '#pages/dashboard/services';
import { ContainerComponent } from '#shared/components';
import { CashFlowSelectors } from '#store/cash-flow';

const imports = [CommonModule, TranslateModule, RouterLink, CardModule, ChartModule, ContainerComponent, ProgressSpinnerModule];

@UntilDestroy()
@Component({
  selector: 'ctrl-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export default class OverviewComponent implements OnInit {
  private readonly store: Store = inject(Store);
  private readonly chartService: ChartService = inject(ChartService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  public readonly totalBalance$: Observable<number> = this.getTotalBalance$();
  public readonly isCashFlowLoading$: Observable<boolean> = this.store.select(CashFlowSelectors.isLoading);

  private readonly incomes$: Observable<CashFlow[]> = this.store.select(CashFlowSelectors.incomes);
  private readonly expenses$: Observable<CashFlow[]> = this.store.select(CashFlowSelectors.expenses);

  public incomesChartData!: CustomChartData;
  public expensesChartData!: CustomChartData;
  public readonly chartsOptions = this.chartService.getChartOptions();

  public ngOnInit(): void {
    combineLatest({
      expenses: this.expenses$,
      incomes: this.incomes$,
    })
      .pipe(
        tap(({ expenses, incomes }): void => {
          this.incomesChartData = this.chartService.setChartIncomesData(incomes);
          this.expensesChartData = this.chartService.setChartExpensesData(expenses);

          this.cdr.markForCheck();
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private getTotalBalance$(): Observable<number> {
    return combineLatest({
      totalIncomes: this.store.select(CashFlowSelectors.totalIncomes),
      totalExpenses: this.store.select(CashFlowSelectors.totalExpenses),
    }).pipe(map(({ totalIncomes, totalExpenses }) => totalIncomes - totalExpenses));
  }
}
