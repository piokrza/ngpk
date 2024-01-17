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

  public readonly isLoading$: Observable<boolean> = this.cashFlowFacadeService.isLoading$;
  public readonly incomes$: Observable<CashFlowData> = this.cashFlowFacadeService.incomesDataset$;
  public readonly expenses$: Observable<CashFlowData> = this.cashFlowFacadeService.expensesDataset$;
  public readonly categories$: Observable<{ incomes: Category[]; expenses: Category[] }> = this.cashFlowFacadeService.categories$;

  public readonly activeTabIndex$: Observable<number> = this.cashFlowFacadeService.activeTabIndex$;

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  public readonly rowsPerPageOptions: number[] = rowsPerPageOptions;

  public addCashFlow(isIncomeMode: boolean): void {
    this.cashFlowFacadeService.openCashFlowDialog$(isIncomeMode).pipe(first()).subscribe();
  }

  public updateIncome(updatedIncome: CashFlow): void {
    this.cashFlowFacadeService.updateIncome$(updatedIncome).pipe(first()).subscribe();
  }

  public removeIncome(incomeId: string): void {
    this.cashFlowFacadeService.removeIncome(incomeId);
  }

  public updateExpense(updatedExpense: CashFlow): void {
    this.cashFlowFacadeService.updateExpense$(updatedExpense).pipe(first()).subscribe();
  }

  public removeExpense(expenseId: string): void {
    this.cashFlowFacadeService.removeExpense(expenseId);
  }

  public incomesCategoryChange(categoryIds: string[]): void {
    this.cashFlowFacadeService.setIncomesCategoryFilter(categoryIds);
  }

  public expensesCategoryChange(categoryIds: string[]): void {
    this.cashFlowFacadeService.setExpensesCategoryFilter(categoryIds);
  }

  public incomesPageChange(event: PaginatorState): void {
    this.cashFlowFacadeService.setIncomesPaginatorState(event);
  }

  public expensesPageChange(event: PaginatorState): void {
    this.cashFlowFacadeService.setExpensesPaginatorState(event);
  }
}
