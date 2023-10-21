import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, takeUntil } from 'rxjs';

import { CashFlowUpdateFormComponent } from '#features/cash-flow/components';
import { CashFlow } from '#features/cash-flow/models';
import { DestroyComponent } from '#shared/components/destroy';
import { CashFlowActions, CashFlowSelectors } from '#store/cash-flow';


@Component({
  selector: 'ctrl-expenses-view',
  template: `
    <ctrl-navigation>
      <ctrl-cash-flow-panel
        (cashFlowSubmitData)="onSubmit($event)"
        (cashFlowToRemoveId)="removeExpense($event)"
        (cashFlowToUpdate)="updateExpense($event)"
        [cashFlowData]="(expenses$ | async)!"
        [totalCashFlowAmount]="(totalExpensesAmount$ | async)!"
        [isLoading]="(isLoading$ | async)!"
        [isIncomeMode]="isIncomeMode" />
    </ctrl-navigation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesViewComponent extends DestroyComponent {
  private store: Store = inject(Store);
  private dialogService: DialogService = inject(DialogService);
  private confirmationService: ConfirmationService = inject(ConfirmationService);

  public expenses$: Observable<CashFlow[]> = this.store.select(CashFlowSelectors.expenses);
  public isLoading$: Observable<boolean> = this.store.select(CashFlowSelectors.isLoading);
  public totalExpensesAmount$: Observable<number> = this.store.select(CashFlowSelectors.totalExpenses);

  public isIncomeMode = false;

  constructor() {
    super();
  }

  public onSubmit(expense: CashFlow): void {
    this.store.dispatch(CashFlowActions.addExpense({ expense }));
  }

  public removeExpense(expenseId: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this expense?',
      header: 'Confirmation',
      icon: 'pi pi-trash',
      accept: (): void => {
        this.store.dispatch(CashFlowActions.removeExpense({ expenseId }));
      },
    });
  }

  public updateExpense(updatedExpense: CashFlow): void {
    const dialogRef: DynamicDialogRef = this.dialogService.open(CashFlowUpdateFormComponent, {
      header: 'Update expense',
      style: { width: '90%', maxWidth: '600px' },
      data: { updatedCashFlow: updatedExpense, isIncomeMode: this.isIncomeMode },
    });

    dialogRef.onClose.pipe(takeUntil(this.destroy$)).subscribe({
      next: (updatedExpense: CashFlow): void => {
        updatedExpense && this.store.dispatch(CashFlowActions.updateExpense({ updatedExpense }));
      },
    });
  }
}
