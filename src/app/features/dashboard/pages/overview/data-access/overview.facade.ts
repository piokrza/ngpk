import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, combineLatest, map, tap } from 'rxjs';

import { CashFlow } from '#cash-flow/models';
import { BaseDialogStyles } from '#common/constants';
import { AppPaths, DashobardPaths } from '#common/enums';
import { LabeledData } from '#common/models';
import { bgColors, bgColorsHover, categoryNames, expensesCatLength, incomesCatLength } from '#overview/constants';
import { ChartConfig, TaskerData } from '#overview/models';
import { CashFlowSelectors } from '#store/cash-flow';
import { TaskerActions, TaskerSelectors } from '#store/tasker';
import { NoteFormComponent } from '#tasker/components';
import { TaskerService } from '#tasker/data-access';
import { Note } from '#tasker/models';

@Injectable()
export class OverviewFacade {
  private readonly store: Store = inject(Store);
  private readonly router: Router = inject(Router);
  private readonly taskerService: TaskerService = inject(TaskerService);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly translate: TranslateService = inject(TranslateService);

  public get isLoading$(): Observable<boolean> {
    return this.store.select(CashFlowSelectors.isLoading);
  }

  public get cashFlowData$(): Observable<LabeledData<number>[]> {
    return combineLatest({
      totalBalance: this.totalBalance$,
      totalIncome: this.store.select(CashFlowSelectors.totalIncomes),
      totalExpense: this.store.select(CashFlowSelectors.totalExpenses),
      transactionAmount: this.transactionAmount$,
    }).pipe(
      map((data) => [
        { label: 'totalBalance', data: data.totalBalance },
        { label: 'totalExpense', data: data.totalExpense },
        { label: 'totalIncome', data: data.totalIncome },
        { label: 'transactionAmount', data: data.transactionAmount },
      ])
    );
  }

  public get cashFlowChartData$(): Observable<ChartConfig | undefined> {
    return combineLatest({
      incomes: this.store.select(CashFlowSelectors.incomes),
      expenses: this.store.select(CashFlowSelectors.expenses),
    }).pipe(
      map(({ incomes, expenses }) => {
        const documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);

        if (!incomes.length || !expenses.length) return undefined;

        return {
          data: {
            labels: [...categoryNames.map((name) => this.translate.instant(`overview.${name}`))],
            datasets: [
              {
                data: [
                  ...Array.from({ length: expensesCatLength }, (_, i) => this.getTotalCashFlowAmountByCategoryCode(expenses, i)),
                  ...Array.from({ length: incomesCatLength }, (_, i) => {
                    return this.getTotalCashFlowAmountByCategoryCode(incomes, i + expensesCatLength);
                  }),
                ],
                backgroundColor: [...bgColors.map((bgClr) => documentStyle.getPropertyValue(bgClr))],
                hoverBackgroundColor: [...bgColorsHover.map((bgClr) => documentStyle.getPropertyValue(bgClr))],
              },
            ],
          },
          options: { plugins: { legend: { display: false } } },
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

  public addQuickNote$(): Observable<Note | undefined> {
    const dialogRef: DynamicDialogRef = this.dialogService.open(NoteFormComponent, {
      header: this.translate.instant('tasker.addNote'),
      style: BaseDialogStyles,
    });

    return dialogRef.onClose.pipe(
      tap((note?: Note) => {
        if (note) {
          this.store.dispatch(TaskerActions.addNote({ note }));
          this.taskerService.setActiveTabIndex(1);
          this.router.navigate([AppPaths.DASHBOARD, DashobardPaths.TASKER]);
        }
      })
    );
  }

  private get totalBalance$(): Observable<number> {
    return combineLatest({
      totalIncomes: this.store.select(CashFlowSelectors.totalIncomes),
      totalExpenses: this.store.select(CashFlowSelectors.totalExpenses),
    }).pipe(map(({ totalIncomes, totalExpenses }) => totalIncomes - totalExpenses));
  }

  private get transactionAmount$(): Observable<number> {
    return combineLatest({
      incomesLength: this.store.select(CashFlowSelectors.incomes).pipe(map((incomes) => incomes.length)),
      expensesLength: this.store.select(CashFlowSelectors.expenses).pipe(map((expenses) => expenses.length)),
    }).pipe(map(({ incomesLength, expensesLength }): number => incomesLength + expensesLength));
  }

  private getTotalCashFlowAmountByCategoryCode(cf: CashFlow[], code: number): number {
    return cf.filter((c) => c.categoryCode === code).reduce((acc, { amount }) => acc + amount, 0);
  }
}
