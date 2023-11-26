import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, combineLatest, map, tap } from 'rxjs';

import { BaseDialogStyles } from '#common/constants';
import { AppPaths } from '#common/enums';
import { LabelWithData } from '#common/models';
import { DashobardPaths } from '#dashboard/enums';
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
            labels: [
              this.translate.instant('overview.rentalFees'),
              this.translate.instant('overview.travel'),
              this.translate.instant('overview.food'),
              this.translate.instant('overview.entertainment'),
              this.translate.instant('overview.concerts'),
              this.translate.instant('overview.salary'),
              this.translate.instant('overview.gifts'),
            ],
            datasets: [
              {
                data: [
                  expenses.filter((c) => c.categoryCode === 0).reduce((acc, { amount }) => acc + amount, 0),
                  expenses.filter((c) => c.categoryCode === 1).reduce((acc, { amount }) => acc + amount, 0),
                  expenses.filter((c) => c.categoryCode === 2).reduce((acc, { amount }) => acc + amount, 0),
                  expenses.filter((c) => c.categoryCode === 3).reduce((acc, { amount }) => acc + amount, 0),
                  incomes.filter((c) => c.categoryCode === 4).reduce((acc, { amount }) => acc + amount, 0),
                  incomes.filter((c) => c.categoryCode === 5).reduce((acc, { amount }) => acc + amount, 0),
                  incomes.filter((c) => c.categoryCode === 6).reduce((acc, { amount }) => acc + amount, 0),
                ],
                backgroundColor: [
                  documentStyle.getPropertyValue('--pink-400'),
                  documentStyle.getPropertyValue('--pink-500'),
                  documentStyle.getPropertyValue('--pink-600'),
                  documentStyle.getPropertyValue('--pink-700'),
                  documentStyle.getPropertyValue('--green-500'),
                  documentStyle.getPropertyValue('--green-600'),
                  documentStyle.getPropertyValue('--green-700'),
                ],
                hoverBackgroundColor: [
                  documentStyle.getPropertyValue('--pink-700'),
                  documentStyle.getPropertyValue('--pink-600'),
                  documentStyle.getPropertyValue('--pink-500'),
                  documentStyle.getPropertyValue('--pink-400'),
                  documentStyle.getPropertyValue('--green-700'),
                  documentStyle.getPropertyValue('--green-600'),
                  documentStyle.getPropertyValue('--green-500'),
                ],
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
}
