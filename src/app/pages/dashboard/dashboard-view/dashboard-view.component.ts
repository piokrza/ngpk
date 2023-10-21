import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatestWith, map, Observable, takeUntil } from 'rxjs';

import { CashFlow } from '#features/cash-flow/models';
import { CustomChartData } from '#pages/dashboard/models';
import { ChartService } from '#pages/dashboard/services';
import { DestroyComponent } from '#shared/components/destroy';
import { CashFlowSelectors } from '#store/cash-flow';


@Component({
  selector: 'ctrl-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardViewComponent extends DestroyComponent implements OnInit {
  private readonly store: Store = inject(Store);
  private readonly chartService: ChartService = inject(ChartService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  private readonly expenses$: Observable<CashFlow[]> = this.store.select(CashFlowSelectors.expenses);
  private readonly incomes$: Observable<CashFlow[]> = this.store.select(CashFlowSelectors.incomes);

  public readonly totalBalance$: Observable<number> = this.getTotalBalance$();
  public readonly isCashFlowLoading$: Observable<boolean> = this.store.select(CashFlowSelectors.isLoading);

  public readonly chartsOptions = this.chartService.getChartOptions();

  public expensesChartData!: CustomChartData;
  public incomesChartData!: CustomChartData;

  public constructor() {
    super();
  }

  public ngOnInit(): void {
    this.expenses$.pipe(combineLatestWith(this.incomes$), takeUntil(this.destroy$)).subscribe({
      next: ([expenses, incomes]: [CashFlow[], CashFlow[]]): void => {
        this.expensesChartData = this.chartService.setChartExpensesData(expenses);
        this.incomesChartData = this.chartService.setChartIncomesData(incomes);

        this.cdr.markForCheck();
      },
    });
  }

  private getTotalBalance$(): Observable<number> {
    return this.store.select(CashFlowSelectors.totalIncomes).pipe(
      combineLatestWith(this.store.select(CashFlowSelectors.totalExpenses)),
      map(([incomes, expenses]: [number, number]): number => incomes - expenses)
    );
  }
}
