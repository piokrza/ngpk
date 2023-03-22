import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CashFlow } from '@common/models/cash-flow.model';
import { CashFlowActions, CashFlowSelectors } from '@store/cash-flow';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'ctrl-expenses-view',
  template: `
    <ctrl-cash-flow-panel
      (cashFlowSubmitData)="onSubmit($event)"
      (itemToRemoveId)="removeExpense($event)"
      [cashFlowData]="(expenses$ | async)!"
      [totalCashFlowAmount]="(totalExpensesAmount$ | async)!"
      [isLoading]="(isLoading$ | async)!"
      [isIncomeMode]="false" />

    <p-confirmDialog />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesViewComponent {
  private store: Store = inject(Store);
  private confirmationService: ConfirmationService = inject(ConfirmationService);

  public expenses$: Observable<CashFlow[]> = this.store.select(CashFlowSelectors.expenses);
  public isLoading$: Observable<boolean> = this.store.select(CashFlowSelectors.isLoading);
  public totalExpensesAmount$: Observable<number> = this.store.select(CashFlowSelectors.totalExpenses);

  public onSubmit(expense: CashFlow): void {
    this.store.dispatch(CashFlowActions.addExpense({ expense }));
  }

  public removeExpense(expenseId: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this expense?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: (): void => {
        this.store.dispatch(CashFlowActions.removeExpense({ expenseId }));
      },
    });
  }
}
