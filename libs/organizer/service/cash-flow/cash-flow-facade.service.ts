import { Injectable, Signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { Observable, combineLatestWith, map, tap } from 'rxjs';

import { baseDialogStyles } from '@ngpk/core/constant';
import { AddFormComponent, UpdateFormComponent } from '@ngpk/organizer/component/cash-flow';
import { OrganizerPaths } from '@ngpk/organizer/enum';
import { CashFlow, CashFlowData, Category, CategoryType } from '@ngpk/organizer/model';
import { CashFlowFilterService, CashFlowPaginationService, CashFlowService } from '@ngpk/organizer/service/cash-flow';
import { CashFlowActions, CashFlowSelectors } from '@ngpk/organizer/state/cash-flow';
import { ConfigSelectors } from '@ngpk/organizer/state/config';

@Injectable()
export class CashFlowFacadeService {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly dialogService = inject(DialogService);
  private readonly cashFlowService = inject(CashFlowService);
  private readonly translateService = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly cashFlowFilterService = inject(CashFlowFilterService);
  private readonly cashFlowPaginationService = inject(CashFlowPaginationService);

  get incomesDataset$(): Observable<CashFlowData> {
    return this.cashFlowService.setCashFlowData(this.incomes$, this.cashFlowPaginationService.incomesPaginatorState$);
  }

  get expensesDataset$(): Observable<CashFlowData> {
    return this.cashFlowService.setCashFlowData(this.expenses$, this.cashFlowPaginationService.expensesPaginatorState$);
  }

  get activeTabIndex(): Signal<number> {
    return this.cashFlowService.activeTabIndex;
  }

  get isLoading$(): Observable<boolean> {
    return this.store.select(CashFlowSelectors.isLoading);
  }

  get categories$(): Observable<Category[]> {
    return this.store.select(ConfigSelectors.cashFlowCategories());
  }

  private get incomes$(): Observable<CashFlow[]> {
    return this.store.select(CashFlowSelectors.cashFlow('income')).pipe(
      combineLatestWith(this.cashFlowFilterService.select('incomeCategory')),
      map(([incomes, categoryFilter]) => {
        return incomes.filter((income) => (categoryFilter.length ? categoryFilter.includes(income.categoryId) : income));
      })
    );
  }

  private get expenses$(): Observable<CashFlow[]> {
    return this.store.select(CashFlowSelectors.cashFlow('expense')).pipe(
      combineLatestWith(this.cashFlowFilterService.select('expenseCategory')),
      map(([expenses, categoryFilter]) => {
        return expenses.filter((income) => (categoryFilter.length ? categoryFilter.includes(income.categoryId) : income));
      })
    );
  }

  getCategories(type: CategoryType): Observable<Category[]> {
    return this.store.select(ConfigSelectors.cashFlowCategories(type));
  }

  deleteCashFlow(id: string): void {
    this.confirmationService.confirm({
      message: this.translateService.instant('incomes.removeMessage'),
      header: this.translateService.instant('incomes.removeHeader'),
      icon: PrimeIcons.TRASH,
      accept: () => {
        this.store.dispatch(CashFlowActions.deleteCashFlow({ id }));
        this.router.navigate([OrganizerPaths.CASH_FLOW]);
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
    this.cashFlowFilterService.update('incomeCategory', categoryIds);
  }

  setExpensesCategoryFilter(categoryIds: string[]): void {
    this.cashFlowFilterService.update('expenseCategory', categoryIds);
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
