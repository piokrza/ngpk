import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ChartData } from 'chart.js';
import { Observable, combineLatest, map, tap } from 'rxjs';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { CashFlow, Category } from '#cash-flow/models';
import { BaseDialogStyles } from '#common/constants';
import { AppPaths, DashobardPaths } from '#common/enums';
import { LabeledData } from '#common/models';
import { getRandomNumber } from '#common/utils';
import { ChartColor, TaskerData } from '#overview/models';
import { AuthSelectors } from '#store/auth';
import { CashFlowSelectors } from '#store/cash-flow';
import { TaskerActions, TaskerSelectors } from '#store/tasker';
import { NoteFormComponent } from '#tasker/components';
import { Note } from '#tasker/models';
import { TaskerService } from '#tasker/services';

@Injectable()
export class OverviewService {
  readonly #store: Store = inject(Store);
  readonly #router: Router = inject(Router);
  readonly #taskerService: TaskerService = inject(TaskerService);
  readonly #dialogService: DialogService = inject(DialogService);
  readonly #translate: TranslateService = inject(TranslateService);

  public get isLoading$(): Observable<boolean> {
    return this.#store.select(CashFlowSelectors.isLoading);
  }

  public get incomesChartData$(): Observable<ChartData | undefined> {
    return combineLatest({
      incomes: this.#store.select(CashFlowSelectors.incomes),
      categories: this.#store.select(AuthSelectors.categories),
    }).pipe(map(({ incomes, categories }) => this.generateCashFlowChartData(incomes, categories.incomes, 'green')));
  }

  public get expensesChartData$(): Observable<ChartData | undefined> {
    return combineLatest({
      expenses: this.#store.select(CashFlowSelectors.expenses),
      categories: this.#store.select(AuthSelectors.categories),
    }).pipe(map(({ expenses, categories }) => this.generateCashFlowChartData(expenses, categories.expenses, 'pink')));
  }

  public get taskerData$(): Observable<TaskerData> {
    return combineLatest({
      tasks: this.#store.select(TaskerSelectors.tasks),
      notes: this.#store.select(TaskerSelectors.notes),
    }).pipe(
      map(({ tasks, notes }) => ({
        totalTasksLength: tasks?.length,
        completedTasksLength: tasks?.filter(({ isComplete }) => isComplete).length,
        notesLength: notes?.length,
      }))
    );
  }

  public get cashFlowData$(): Observable<LabeledData<number>[]> {
    return combineLatest({
      totalBalance: this.totalBalance$,
      totalIncome: this.#store.select(CashFlowSelectors.totalIncomes),
      totalExpense: this.#store.select(CashFlowSelectors.totalExpenses),
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

  public addQuickNote$(): Observable<Note | undefined> {
    const dialogRef: DynamicDialogRef = this.#dialogService.open(NoteFormComponent, {
      header: this.#translate.instant('tasker.addNote'),
      style: BaseDialogStyles,
    });

    return dialogRef.onClose.pipe(
      tap((note?: Note) => {
        if (note) {
          this.#store.dispatch(TaskerActions.addNote({ note }));
          this.#taskerService.setActiveTabIndex(1);
          void this.#router.navigate([AppPaths.DASHBOARD, DashobardPaths.TASKER]);
        }
      })
    );
  }

  private get totalBalance$(): Observable<number> {
    return combineLatest({
      totalIncomes: this.#store.select(CashFlowSelectors.totalIncomes),
      totalExpenses: this.#store.select(CashFlowSelectors.totalExpenses),
    }).pipe(map(({ totalIncomes, totalExpenses }) => totalIncomes - totalExpenses));
  }

  private get transactionAmount$(): Observable<number> {
    return combineLatest({
      incomesLength: this.#store.select(CashFlowSelectors.incomes).pipe(map((incomes) => incomes.length)),
      expensesLength: this.#store.select(CashFlowSelectors.expenses).pipe(map((expenses) => expenses.length)),
    }).pipe(map(({ incomesLength, expensesLength }): number => incomesLength + expensesLength));
  }

  private generateCashFlowChartData(
    cashFlowList: CashFlow[],
    categories: Category[],
    chartColorPalette: ChartColor
  ): ChartData | undefined {
    if (!cashFlowList.length) return undefined;

    const data: number[] = this.calculateCashflow(cashFlowList, categories);
    const { backgroundColor, hoverBackgroundColor } = this.generateBgColors(data.length, chartColorPalette);

    return {
      labels: categories.map(({ name }: Category) => name),
      datasets: [{ data, backgroundColor, hoverBackgroundColor }],
    };
  }

  private calculateCashflow(cashFlowList: CashFlow[], categories: Category[]): number[] {
    return categories.map((category: Category) => {
      return cashFlowList.reduce((total: number, cashFlow: CashFlow) => {
        if (cashFlow.categoryId === category.id) {
          return total + cashFlow.amount;
        }

        return total;
      }, 0);
    });
  }

  private generateBgColors(amountOfColors: number, color: ChartColor) {
    const getClr = (clr: string): string => {
      return getComputedStyle(document.documentElement).getPropertyValue(clr);
    };

    return {
      backgroundColor: Array.from({ length: amountOfColors }, () => {
        const colorScale = getRandomNumber(4, 9); //TODO: set icon and color for category (add edit category)
        return getClr(`--${color}-${colorScale}00`);
      }),
      hoverBackgroundColor: Array.from({ length: amountOfColors }, () => {
        const colorScale = getRandomNumber(4, 9);
        return getClr(`--${color}-${colorScale - 2}00`);
      }),
    };
  }
}
