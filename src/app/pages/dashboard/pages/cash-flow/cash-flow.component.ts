import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateModule } from '@ngx-translate/core';
import { TabViewModule } from 'primeng/tabview';
import { Observable } from 'rxjs';

import { CashFlowModule } from '#features/cash-flow';
import { CashFlow } from '#features/cash-flow/models';
import { CashFlowData } from '#pages/dashboard/models';
import { CashFlowFacade } from '#pages/dashboard/pages/cash-flow';
import { UiModule } from '#shared/ui';

const imports = [AsyncPipe, CashFlowModule, UiModule, TabViewModule, TranslateModule, NgIf];

@UntilDestroy()
@Component({
  selector: 'ctrl-cash-flow',
  templateUrl: './cash-flow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export default class CashFlowComponent {
  private readonly cashFlowFacade: CashFlowFacade = inject(CashFlowFacade);

  public readonly isLoading$: Observable<boolean> = this.cashFlowFacade.isLoading$;
  public readonly incomesDataset$: Observable<CashFlowData> = this.cashFlowFacade.incomesDataset$;
  public readonly expensesDataset$: Observable<CashFlowData> = this.cashFlowFacade.expensesDataset$;

  public updateIncome(updatedIncome: CashFlow): void {
    this.cashFlowFacade.updateIncome$(updatedIncome).pipe(untilDestroyed(this)).subscribe();
  }

  public removeIncome(incomeId: string): void {
    this.cashFlowFacade.removeIncome(incomeId);
  }

  public onIncomeSubmit(incomeData: CashFlow): void {
    this.cashFlowFacade.onIncomeSubmit(incomeData);
  }

  public updateExpense(updatedExpense: CashFlow): void {
    this.cashFlowFacade.updateExpense$(updatedExpense).pipe(untilDestroyed(this)).subscribe();
  }

  public removeExpense(expenseId: string): void {
    this.cashFlowFacade.removeExpense(expenseId);
  }

  public onExpenseSubmit(expenseData: CashFlow): void {
    this.cashFlowFacade.onExpenseSubmit(expenseData);
  }
}
