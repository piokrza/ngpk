import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, combineLatest, filter, map, tap } from 'rxjs';

import { CashFlow, Category } from '#cash-flow/models';
import { BaseDialogStyles } from '#common/constants';
import { AppPaths, DashobardPaths } from '#common/enums';
import { LabeledData } from '#common/models';
import { getRandomNumber } from '#common/utils';
import { ChartConfig, TaskerData } from '#overview/models';
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

  public get cashFlowChartData$(): Observable<ChartConfig | undefined> {
    return combineLatest({
      incomes: this.#store.select(CashFlowSelectors.incomes),
      expenses: this.#store.select(CashFlowSelectors.expenses),
      userCategories: this.#store.select(AuthSelectors.user).pipe(
        filter(Boolean),
        map(({ config }) => config.categories)
      ),
    }).pipe(
      map(({ incomes, expenses, userCategories }): ChartConfig | undefined => {
        if (![...incomes, ...expenses].length) return undefined;

        const backgroundColor: string[] = [];
        const hoverBackgroundColor: string[] = [];

        const labels: string[] = [...userCategories.incomes, ...userCategories.expenses].map(({ name }: Category) => name);
        const data: number[] = [
          ...this.calculateCashflow(incomes, userCategories.incomes, backgroundColor, hoverBackgroundColor, 'green'),
          ...this.calculateCashflow(expenses, userCategories.expenses, backgroundColor, hoverBackgroundColor, 'pink'),
        ];

        return {
          data: { labels, datasets: [{ data, backgroundColor, hoverBackgroundColor }] },
          options: { plugins: { legend: { display: false } } },
        };
      })
    );
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

  private calculateCashflow(
    cashFlowList: CashFlow[],
    userCategories: Category[],
    backgroundColors: string[],
    hoverBackgroundColors: string[],
    color: 'green' | 'pink'
  ): number[] {
    const getClr = (clr: string) => getComputedStyle(document.documentElement).getPropertyValue(clr);

    return userCategories.map((category: Category) => {
      return cashFlowList.reduce((total: number, cashFlow: CashFlow) => {
        if (cashFlow.categoryId === category.id) {
          const colorScale: number = getRandomNumber(4, 9);
          backgroundColors.push(getClr(`--${color}-${colorScale}00`));
          hoverBackgroundColors.push(getClr(`--${color}-${colorScale - 2}00`));

          return total + cashFlow.amount;
        }

        return total;
      }, 0);
    });
  }
}
