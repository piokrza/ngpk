import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Observable, first } from 'rxjs';

import { PrimeIcons } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { TabViewChangeEvent } from 'primeng/tabview';

import { CashFlow, CashFlowData } from '#cash-flow/models';
import { CashFlowFacadeService } from '#cash-flow/services';
import { rowsPerPageOptions } from '#core/constants';
import { TitleService } from '#core/services';

@Component({
  selector: 'org-cash-flow',
  templateUrl: './cash-flow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowComponent implements OnInit {
  private readonly titleService = inject(TitleService);
  private readonly cashFlowFacadeService = inject(CashFlowFacadeService);

  readonly incomes$: Observable<CashFlowData> = this.cashFlowFacadeService.incomesDataset$;
  readonly incomeCategories$ = this.cashFlowFacadeService.getCategories('income');
  readonly expenses$: Observable<CashFlowData> = this.cashFlowFacadeService.expensesDataset$;
  readonly expenseCategories$ = this.cashFlowFacadeService.getCategories('expense');
  readonly isLoading$: Observable<boolean> = this.cashFlowFacadeService.isLoading$;

  readonly activeTabIndex$: Observable<number> = this.cashFlowFacadeService.activeTabIndex$;

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly rowsPerPageOptions: number[] = rowsPerPageOptions;

  ngOnInit(): void {
    this.titleService.setTitle('cashFlow');
  }

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
