import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, combineLatest, tap } from 'rxjs';

import { UpdateFormComponent } from '#features/cash-flow/components';
import { CashFlow } from '#features/cash-flow/models';
import { CashFlowData } from '#pages/dashboard/models';
import { CashFlowSelectors, CashFlowActions } from '#store/cash-flow';

@Injectable({ providedIn: 'root' })
export class CashFlowFacade {
  private readonly store: Store = inject(Store);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);

  public get incomesDataset$(): Observable<CashFlowData> {
    return combineLatest({
      data: this.store.select(CashFlowSelectors.incomes),
      amount: this.store.select(CashFlowSelectors.totalIncomes),
    });
  }

  public get expensesDataset$(): Observable<CashFlowData> {
    return combineLatest({
      data: this.store.select(CashFlowSelectors.expenses),
      amount: this.store.select(CashFlowSelectors.totalExpenses),
    });
  }

  public get isLoading$(): Observable<boolean> {
    return this.store.select(CashFlowSelectors.isLoading);
  }

  public onIncomeSubmit(incomeData: CashFlow): void {
    this.store.dispatch(CashFlowActions.addIncome({ income: incomeData }));
  }

  public removeIncome(incomeId: string): void {
    this.confirmationService.confirm({
      message: this.translateService.instant('incomes.removeMessage'),
      header: this.translateService.instant('incomes.removeHeader'),
      icon: PrimeIcons.TRASH,
      accept: (): void => this.store.dispatch(CashFlowActions.removeIncome({ incomeId })),
    });
  }

  public updateIncome$(updatedIncome: CashFlow): Observable<CashFlow | undefined> {
    const dialogRef: DynamicDialogRef = this.dialogService.open(UpdateFormComponent, {
      header: this.translateService.instant('incomes.updateIncome'),
      style: { width: '90%', maxWidth: '600px' },
      data: { updatedCashFlow: updatedIncome, isIncomeMode: true },
    });

    return dialogRef.onClose.pipe(
      tap((updatedIncome?: CashFlow): void => {
        updatedIncome && this.store.dispatch(CashFlowActions.updateIncome({ updatedIncome }));
      })
    );
  }

  public onExpenseSubmit(expense: CashFlow): void {
    this.store.dispatch(CashFlowActions.addExpense({ expense }));
  }

  public removeExpense(expenseId: string): void {
    this.confirmationService.confirm({
      message: this.translateService.instant('expenses.removeMessage'),
      header: this.translateService.instant('expenses.removeHeader'),
      icon: PrimeIcons.TRASH,
      accept: (): void => this.store.dispatch(CashFlowActions.removeExpense({ expenseId })),
    });
  }

  public updateExpense$(updatedExpense: CashFlow): Observable<CashFlow | undefined> {
    const dialogRef: DynamicDialogRef = this.dialogService.open(UpdateFormComponent, {
      header: 'Update expense',
      style: { width: '90%', maxWidth: '600px' },
      data: { updatedCashFlow: updatedExpense, isIncomeMode: false },
    });

    return dialogRef.onClose.pipe(
      tap((updatedExpense?: CashFlow): void => {
        updatedExpense && this.store.dispatch(CashFlowActions.updateExpense({ updatedExpense }));
      })
    );
  }
}
