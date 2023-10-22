import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, tap } from 'rxjs';

import { CashFlowUpdateFormComponent } from '#features/cash-flow/components';
import { CashFlow } from '#features/cash-flow/models';
import { CashFlowActions, CashFlowSelectors } from '#store/cash-flow';

@UntilDestroy()
@Component({
  selector: 'ctrl-expenses-view',
  template: `
    <ctrl-cash-flow-panel
      (cashFlowSubmitData)="onSubmit($event)"
      (cashFlowToRemoveId)="removeExpense($event)"
      (cashFlowToUpdate)="updateExpense($event)"
      [cashFlowData]="(expenses$ | async)!"
      [totalCashFlowAmount]="(totalExpensesAmount$ | async)!"
      [isLoading]="(isLoading$ | async)!"
      [isIncomeMode]="isIncomeMode" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesViewComponent {
  private readonly store: Store = inject(Store);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);

  public readonly expenses$: Observable<CashFlow[]> = this.store.select(CashFlowSelectors.expenses);
  public readonly isLoading$: Observable<boolean> = this.store.select(CashFlowSelectors.isLoading);
  public readonly totalExpensesAmount$: Observable<number> = this.store.select(CashFlowSelectors.totalExpenses);

  public isIncomeMode = false;

  public onSubmit(expense: CashFlow): void {
    this.store.dispatch(CashFlowActions.addExpense({ expense }));
  }

  public removeExpense(expenseId: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this expense?',
      header: 'Remove expense',
      icon: 'pi pi-trash',
      accept: (): void => this.store.dispatch(CashFlowActions.removeExpense({ expenseId })),
    });
  }

  public updateExpense(updatedExpense: CashFlow): void {
    const dialogRef: DynamicDialogRef = this.dialogService.open(CashFlowUpdateFormComponent, {
      header: 'Update expense',
      style: { width: '90%', maxWidth: '600px' },
      data: { updatedCashFlow: updatedExpense, isIncomeMode: this.isIncomeMode },
    });

    dialogRef.onClose
      .pipe(
        tap((updatedExpense: CashFlow): void => {
          updatedExpense && this.store.dispatch(CashFlowActions.updateExpense({ updatedExpense }));
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
