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
import { CashflowChartData, TaskerData } from '#overview/models';
import { CashFlowSelectors } from '#store/cash-flow';
import { TaskerActions, TaskerSelectors } from '#store/tasker';
import { NoteFormComponent } from '#tasker/components';
import { TaskService } from '#tasker/data-access';
import { Note } from '#tasker/models';

@Injectable()
export class OverviewFacade {
  private readonly store: Store = inject(Store);
  private readonly router: Router = inject(Router);
  private readonly taskService: TaskService = inject(TaskService);
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

  public addQuickNote$(): Observable<Note | undefined> {
    const dialogRef: DynamicDialogRef = this.dialogService.open(NoteFormComponent, {
      header: this.translate.instant('tasker.addNote'),
      style: BaseDialogStyles,
    });

    return dialogRef.onClose.pipe(
      tap((note?: Note) => {
        if (note) {
          this.store.dispatch(TaskerActions.addNote({ note }));
          this.taskService.setActiveTabIndex(1);
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
