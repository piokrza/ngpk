import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CashFlow } from '@features/cash-flow/models/cash-flow.model';
import { ChartService } from '@dashboard/services/chart.service';
import { Store } from '@ngrx/store';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { CashFlowSelectors } from '@store/cash-flow';
import { combineLatestWith, Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'ctrl-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardViewComponent extends DestroyComponent implements OnInit {
  private chartService: ChartService = inject(ChartService);
  private store: Store = inject(Store);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  private expenses$: Observable<CashFlow[]> = this.store.select(CashFlowSelectors.expenses);
  private incomes$: Observable<CashFlow[]> = this.store.select(CashFlowSelectors.incomes);

  public chartsOptions = this.chartService.getChartOptions();

  public expensesChartData: any;
  public incomesChartData: any;

  constructor() {
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
}
