import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, tap } from 'rxjs';

import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';

import { AddFormComponent, UpdateFormComponent } from '#cash-flow/components';
import { CashFlow, CashFlowData, Category } from '#cash-flow/models';
import { CashFlowPaginationService, CashFlowService } from '#cash-flow/services';
import { BaseDialogStyles } from '#core/constants';
import { AuthSelectors } from '#store/auth';
import { CashFlowActions, CashFlowSelectors } from '#store/cash-flow';

@Injectable({ providedIn: 'root' })
export class CashFlowFacadeService {
  private readonly store = inject(Store);
  private readonly dialogService = inject(DialogService);
  private readonly cashFlowService = inject(CashFlowService);
  private readonly translateService = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly cashFlowPaginationService = inject(CashFlowPaginationService);

  public get incomesDataset$(): Observable<CashFlowData> {
    return this.cashFlowService.setCashFlowData(
      this.store.select(CashFlowSelectors.incomes),
      this.cashFlowPaginationService.incomesPaginatorState$
    );
  }

  public get expensesDataset$(): Observable<CashFlowData> {
    return this.cashFlowService.setCashFlowData(
      this.store.select(CashFlowSelectors.expenses),
      this.cashFlowPaginationService.expensesPaginatorState$
    );
  }

  public get activeTabIndex$(): Observable<number> {
    return this.cashFlowService.activeTabIndex$;
  }

  public get isLoading$(): Observable<boolean> {
    return this.store.select(CashFlowSelectors.isLoading);
  }

  public get categories$(): Observable<{ incomes: Category[]; expenses: Category[] }> {
    return this.store.select(AuthSelectors.categories);
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
      style: BaseDialogStyles,
      data: { updatedCashFlow: updatedIncome, isIncomeMode: true },
    });

    return dialogRef.onClose.pipe(
      tap((updatedIncome?: CashFlow): void => {
        updatedIncome && this.store.dispatch(CashFlowActions.updateIncome({ updatedIncome }));
      })
    );
  }

  public openCashFlowDialog$(isIncomeMode: boolean): Observable<CashFlow | undefined> {
    const dialogRef: DynamicDialogRef = this.dialogService.open(AddFormComponent, {
      data: isIncomeMode,
      header: this.translateService.instant('cashFlow.addCashFlow'),
      style: BaseDialogStyles,
    });

    return dialogRef.onClose.pipe(
      tap((cashFlow?: CashFlow) => {
        if (cashFlow) {
          isIncomeMode
            ? this.store.dispatch(CashFlowActions.addIncome({ income: cashFlow }))
            : this.store.dispatch(CashFlowActions.addExpense({ expense: cashFlow }));
        }
      })
    );
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
      header: this.translateService.instant('expenses.updateMessage'),
      style: { ...BaseDialogStyles },
      data: { updatedCashFlow: updatedExpense, isIncomeMode: false },
    });

    return dialogRef.onClose.pipe(
      tap((updatedExpense?: CashFlow): void => {
        updatedExpense && this.store.dispatch(CashFlowActions.updateExpense({ updatedExpense }));
      })
    );
  }

  public setIncomesCategoryFilter(categoryIds: string[]): void {
    this.store.dispatch(CashFlowActions.setIncomesFilter({ categoryIds }));
  }

  public setExpensesCategoryFilter(categoryIds: string[]): void {
    this.store.dispatch(CashFlowActions.setExpensesFilter({ categoryIds }));
  }

  public setIncomesPaginatorState(event: PaginatorState): void {
    this.cashFlowPaginationService.setIncomesPaginatorState(event);
  }

  public setExpensesPaginatorState(event: PaginatorState): void {
    this.cashFlowPaginationService.setExpensesPaginatorState(event);
  }
}
