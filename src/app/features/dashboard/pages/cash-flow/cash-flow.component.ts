import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable, first } from 'rxjs';

import { PrimeIcons } from 'primeng/api';

import { CashFlow, CashFlowData, Category } from '#cash-flow/models';
import { CashFlowFacadeService } from '#cash-flow/services';

@Component({
  selector: 'org-cash-flow',
  templateUrl: './cash-flow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowComponent {
  private readonly cashFlowFacadeService = inject(CashFlowFacadeService);

  readonly isLoading$: Observable<boolean> = this.cashFlowFacadeService.isLoading$;
  readonly incomesDataset$: Observable<CashFlowData> = this.cashFlowFacadeService.incomesDataset$;
  readonly expensesDataset$: Observable<CashFlowData> = this.cashFlowFacadeService.expensesDataset$;
  readonly categories$: Observable<{ incomes: Category[]; expenses: Category[] }> = this.cashFlowFacadeService.categories$;

  readonly activeTabIndex$: Observable<number> = this.cashFlowFacadeService.activeTabIndex$;

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

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
}
