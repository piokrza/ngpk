import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, tap } from 'rxjs';

import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';

import { AddFormComponent, UpdateFormComponent } from '#cash-flow/components';
import { CashFlow, CashFlowData, Category } from '#cash-flow/models';
import { CashFlowPaginationService, CashFlowService } from '#cash-flow/services';
import { CashFlowActions, CashFlowSelectors } from '#cash-flow/store';
import { ConfigSelectors } from '#core/config/store';
import { baseDialogStyles } from '#core/constants';
import { AppPaths } from '#core/enums';
import { DashobardPaths } from '#dashboard/enums';

@Injectable({ providedIn: 'root' })
export class CashFlowFacadeService {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly dialogService = inject(DialogService);
  private readonly cashFlowService = inject(CashFlowService);
  private readonly translateService = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly cashFlowPaginationService = inject(CashFlowPaginationService);

  get incomesDataset$(): Observable<CashFlowData> {
    return this.cashFlowService.setCashFlowData(
      this.store.select(CashFlowSelectors.incomes),
      this.cashFlowPaginationService.incomesPaginatorState$
    );
  }

  get expensesDataset$(): Observable<CashFlowData> {
    return this.cashFlowService.setCashFlowData(
      this.store.select(CashFlowSelectors.expenses),
      this.cashFlowPaginationService.expensesPaginatorState$
    );
  }

  get activeTabIndex$(): Observable<number> {
    return this.cashFlowService.activeTabIndex$;
  }

  get isLoading$(): Observable<boolean> {
    return this.store.select(CashFlowSelectors.isLoading);
  }

  get categories$(): Observable<Category[]> {
    return this.store.select(ConfigSelectors.cashFlowCategories());
  }

  deleteCashFlow(id: string): void {
    this.confirmationService.confirm({
      message: this.translateService.instant('incomes.removeMessage'),
      header: this.translateService.instant('incomes.removeHeader'),
      icon: PrimeIcons.TRASH,
      accept: () => {
        this.store.dispatch(CashFlowActions.deleteCashFlow({ id }));
        this.router.navigate([AppPaths.DASHBOARD, DashobardPaths.CASH_FLOW]);
      },
    });
  }

  updateCashFlow$(cashFlow: CashFlow): Observable<CashFlow | undefined> {
    const dialogRef: DynamicDialogRef = this.dialogService.open(UpdateFormComponent, {
      header: this.translateService.instant('incomes.updateIncome'),
      style: baseDialogStyles,
      data: cashFlow,
    });

    return dialogRef.onClose.pipe(
      tap((cashFlow?: CashFlow) => {
        cashFlow && this.store.dispatch(CashFlowActions.updateCashFlow({ cashFlow }));
      })
    );
  }

  openCashFlowDialog$(isIncomeMode: boolean): Observable<CashFlow | undefined> {
    const dialogRef: DynamicDialogRef = this.dialogService.open(AddFormComponent, {
      data: isIncomeMode,
      header: this.translateService.instant('cashFlow.addCashFlow'),
      style: baseDialogStyles,
    });

    return dialogRef.onClose.pipe(
      tap((cashFlow?: CashFlow) => {
        cashFlow && this.store.dispatch(CashFlowActions.addCashFlow({ cashFlow }));
      })
    );
  }

  getCashFlowById$(id: string): Observable<CashFlow | undefined> {
    return this.store.select(CashFlowSelectors.cashFlowById(id));
  }

  setIncomesCategoryFilter(categoryIds: string[]): void {
    this.store.dispatch(CashFlowActions.setIncomesFilter({ categoryIds }));
  }

  setExpensesCategoryFilter(categoryIds: string[]): void {
    this.store.dispatch(CashFlowActions.setExpensesFilter({ categoryIds }));
  }

  setIncomesPaginatorState(event: PaginatorState): void {
    this.cashFlowPaginationService.setIncomesPaginatorState(event);
  }

  setExpensesPaginatorState(event: PaginatorState): void {
    this.cashFlowPaginationService.setExpensesPaginatorState(event);
  }

  setActiveTabIndex(idx: number): void {
    this.cashFlowService.setActiveTabIndex(idx);
  }
}
