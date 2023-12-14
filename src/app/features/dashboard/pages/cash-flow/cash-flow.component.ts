import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

import { CashFlowFacadeService } from '#cash-flow/data-access';
import { CashFlow, CashFlowData } from '#cash-flow/models';

@UntilDestroy()
@Component({
  selector: 'ctrl-cash-flow',
  templateUrl: './cash-flow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowComponent {
  private readonly cashFlowFacadeService: CashFlowFacadeService = inject(CashFlowFacadeService);

  public readonly isLoading$: Observable<boolean> = this.cashFlowFacadeService.isLoading$;
  public readonly incomesDataset$: Observable<CashFlowData> = this.cashFlowFacadeService.incomesDataset$;
  public readonly expensesDataset$: Observable<CashFlowData> = this.cashFlowFacadeService.expensesDataset$;

  public readonly activeTabIndex$: Observable<number> = this.cashFlowFacadeService.activeTabIndex$;

  public updateIncome(updatedIncome: CashFlow): void {
    this.cashFlowFacadeService.updateIncome$(updatedIncome).pipe(untilDestroyed(this)).subscribe();
  }

  public removeIncome(incomeId: string): void {
    this.cashFlowFacadeService.removeIncome(incomeId);
  }

  public onIncomeSubmit(incomeData: CashFlow): void {
    this.cashFlowFacadeService.addIncome(incomeData);
  }

  public updateExpense(updatedExpense: CashFlow): void {
    this.cashFlowFacadeService.updateExpense$(updatedExpense).pipe(untilDestroyed(this)).subscribe();
  }

  public removeExpense(expenseId: string): void {
    this.cashFlowFacadeService.removeExpense(expenseId);
  }

  public onExpenseSubmit(expenseData: CashFlow): void {
    this.cashFlowFacadeService.addExpense(expenseData);
  }
}
