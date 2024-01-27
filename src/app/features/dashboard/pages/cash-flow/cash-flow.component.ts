import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable, first } from 'rxjs';

import { PrimeIcons } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { TabViewChangeEvent } from 'primeng/tabview';

import { CashFlow, CashFlowData, Category } from '#cash-flow/models';
import { CashFlowFacadeService } from '#cash-flow/services';
import { rowsPerPageOptions } from '#core/constants';

@Component({
  selector: 'org-cash-flow',
  templateUrl: './cash-flow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowComponent {
  private readonly cashFlowFacadeService = inject(CashFlowFacadeService);

  readonly isLoading$: Observable<boolean> = this.cashFlowFacadeService.isLoading$;
  readonly incomes$: Observable<CashFlowData> = this.cashFlowFacadeService.incomesDataset$;
  readonly expenses$: Observable<CashFlowData> = this.cashFlowFacadeService.expensesDataset$;
  readonly categories$: Observable<{ incomes: Category[]; expenses: Category[] }> = this.cashFlowFacadeService.categories$;

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
