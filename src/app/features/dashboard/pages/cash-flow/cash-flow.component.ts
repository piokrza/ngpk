import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable, first } from 'rxjs';

import { PrimeIcons } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';

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

  updateIncome(updatedIncome: CashFlow): void {
    this.cashFlowFacadeService.updateIncome$(updatedIncome).pipe(first()).subscribe();
  }

  removeIncome(incomeId: string): void {
    this.cashFlowFacadeService.removeIncome(incomeId);
  }

  updateExpense(updatedExpense: CashFlow): void {
    this.cashFlowFacadeService.updateExpense$(updatedExpense).pipe(first()).subscribe();
  }

  removeExpense(expenseId: string): void {
    this.cashFlowFacadeService.removeExpense(expenseId);
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
}
