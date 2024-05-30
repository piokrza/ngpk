import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TabViewChangeEvent, TabViewModule } from 'primeng/tabview';
import { Observable, first } from 'rxjs';

import { rowsPerPageOptions } from '@ngpk/core/constant';
import { connectState } from '@ngpk/core/util';
import { CardsComponent, ChartComponent, TileListComponent } from '@ngpk/organizer/component/cash-flow';
import { CashFlow } from '@ngpk/organizer/model';
import { CashFlowFacadeService, OverviewService } from '@ngpk/organizer/service';

const imports = [TranslateModule, ChartComponent, CardsComponent, PaginatorModule, TileListComponent, TabViewModule, AsyncPipe];

@Component({
  selector: 'ngpk-cash-flow-view',
  templateUrl: './cash-flow-view.component.html',
  styleUrl: './cash-flow-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class CashFlowViewComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly overviewService = inject(OverviewService);
  private readonly cashFlowFacadeService = inject(CashFlowFacadeService);

  readonly state = connectState(this.destroyRef, {
    incomes: this.cashFlowFacadeService.incomesDataset$,
    incomesCategories: this.cashFlowFacadeService.getCategories('income'),
    expenses: this.cashFlowFacadeService.expensesDataset$,
    expensesCategories: this.cashFlowFacadeService.getCategories('expense'),
    isLoading: this.cashFlowFacadeService.isLoading$,
  });

  readonly overviewState = connectState(this.destroyRef, {
    cashFlowDataSet: this.overviewService.cashFlowData$,
    incomesChartData: this.overviewService.incomesChartData$,
    expensesChartData: this.overviewService.expensesChartData$,
    isLoading: this.overviewService.isLoading$,
  });

  readonly activeTabIndex$: Observable<number> = this.cashFlowFacadeService.activeTabIndex$;

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly rowsPerPageOptions: number[] = rowsPerPageOptions;

  addCashFlow(isIncomeMode: boolean): void {
    this.cashFlowFacadeService.openCashFlowDialog$(isIncomeMode).pipe(first()).subscribe();
  }

  updateCashFlow(cashFlow: CashFlow): void {
    this.cashFlowFacadeService.updateCashFlow$(cashFlow).pipe(first()).subscribe();
  }

  deleteCashFlow(id: string): void {
    this.cashFlowFacadeService.deleteCashFlow(id);
  }

  incomesCategoryChange(categoryIds: string[]): void {
    this.cashFlowFacadeService.setIncomesCategoryFilter(categoryIds);
  }

  expensesCategoryChange(categoryIds: string[]): void {
    this.cashFlowFacadeService.setExpensesCategoryFilter(categoryIds);
  }

  incomesPageChange(event: PaginatorState): void {
    this.cashFlowFacadeService.setIncomesPaginatorState(event);
  }

  expensesPageChange(event: PaginatorState): void {
    this.cashFlowFacadeService.setExpensesPaginatorState(event);
  }

  setActiveIndex(event: TabViewChangeEvent): void {
    this.cashFlowFacadeService.setActiveTabIndex(event.index);
  }
}
