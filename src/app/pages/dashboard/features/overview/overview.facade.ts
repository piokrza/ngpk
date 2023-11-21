import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, combineLatest, map } from 'rxjs';

import { LabelWithData } from '#common/models';
import { CashflowChartData, TaskerData } from '#pages/dashboard/features/overview/models';
import { CashFlowSelectors } from '#store/cash-flow';
import { TaskerSelectors } from '#store/tasker';

@Injectable()
export class OverviewFacade {
  private readonly store: Store = inject(Store);
  private readonly translate: TranslateService = inject(TranslateService);

  public get isLoading$(): Observable<boolean> {
    return this.store.select(CashFlowSelectors.isLoading);
  }

  public get cashFlowData$(): Observable<LabelWithData<number>[]> {
    return combineLatest({
      totalBalance: this.totalBalance$,
      totalIncome: this.store.select(CashFlowSelectors.totalIncomes),
      totalExpense: this.store.select(CashFlowSelectors.totalExpenses),
      transactionAmount: combineLatest({
        incomesLength: this.store.select(CashFlowSelectors.incomes).pipe(map((incomes) => incomes.length)),
        expensesLength: this.store.select(CashFlowSelectors.expenses).pipe(map((expenses) => expenses.length)),
      }).pipe(map(({ incomesLength, expensesLength }): number => incomesLength + expensesLength)),
    }).pipe(
      map((data) => [
        { label: 'totalBalance', data: data.totalBalance },
        { label: 'totalExpense', data: data.totalExpense },
        { label: 'totalIncome', data: data.totalIncome },
        { label: 'transactionAmount', data: data.transactionAmount },
      ])
    );
  }

  public get cashFlowChartData$(): Observable<CashflowChartData | undefined> {
    return combineLatest({
      incomes: this.store.select(CashFlowSelectors.incomes),
      expenses: this.store.select(CashFlowSelectors.expenses),
    }).pipe(
      map(({ incomes, expenses }) => {
        const documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);

        if (!incomes.length || !expenses.length) return undefined;

        return {
          data: {
            labels: [this.translate.instant('overview.expenses'), this.translate.instant('overview.incomes')],
            datasets: [
              {
                data: [expenses.reduce((acc, { amount }) => acc + amount, 0), incomes.reduce((acc, { amount }) => acc + amount, 0)],
                backgroundColor: [documentStyle.getPropertyValue('--pink-500'), documentStyle.getPropertyValue('--green-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--pink-400'), documentStyle.getPropertyValue('--green-400')],
              },
            ],
          },
        };
      })
    );
  }

  public get taskerData$(): Observable<TaskerData> {
    return combineLatest({
      tasks: this.store.select(TaskerSelectors.tasks),
      notes: this.store.select(TaskerSelectors.notes),
    }).pipe(
      map(({ tasks, notes }) => ({
        totalTasksLength: tasks?.length,
        completedTasksLength: tasks?.filter(({ isComplete }) => isComplete).length,
        notesLength: notes?.length,
      }))
    );
  }

  private get totalBalance$(): Observable<number> {
    return combineLatest({
      totalIncomes: this.store.select(CashFlowSelectors.totalIncomes),
      totalExpenses: this.store.select(CashFlowSelectors.totalExpenses),
    }).pipe(map(({ totalIncomes, totalExpenses }) => totalIncomes - totalExpenses));
  }
}
