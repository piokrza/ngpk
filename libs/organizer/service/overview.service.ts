import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData } from 'chart.js';
import { Observable, combineLatest, map } from 'rxjs';

import { ConfigSelectors } from '@ngpk/auth-organizer/config/store';
import { LabeledData, ObservableDictionary } from '@ngpk/core/model';
import { getRandomNumber } from '@ngpk/core/util';
import { CashFlowDataSet, OverviewStateModel, CashFlow, Category, ChartColor } from '@ngpk/organizer/model';
import { CashFlowSelectors } from '@ngpk/organizer/state/cash-flow';

@Injectable()
export class OverviewService {
  private readonly store = inject(Store);

  get state(): ObservableDictionary<OverviewStateModel> {
    return {
      cashFlowDataSet: this.cashFlowData$,
      incomesChartData: this.incomesChartData$,
      expensesChartData: this.expensesChartData$,
      isLoading: this.store.select(CashFlowSelectors.isLoading),
    };
  }

  private get incomesChartData$(): Observable<ChartData | undefined> {
    return combineLatest({
      incomes: this.store.select(CashFlowSelectors.cashFlow('income')),
      categories: this.store.select(ConfigSelectors.cashFlowCategories('income')),
    }).pipe(map(({ incomes, categories }) => this.generateCashFlowChartData(incomes, categories, 'green')));
  }

  private get expensesChartData$(): Observable<ChartData | undefined> {
    return combineLatest({
      expenses: this.store.select(CashFlowSelectors.cashFlow('expense')),
      categories: this.store.select(ConfigSelectors.cashFlowCategories('expense')),
    }).pipe(map(({ expenses, categories }) => this.generateCashFlowChartData(expenses, categories, 'pink')));
  }

  private get cashFlowData$(): Observable<LabeledData<CashFlowDataSet>[]> {
    return combineLatest({
      totalBalance: this.totalBalance$,
      totalIncome: this.store.select(CashFlowSelectors.totalCashFlow('income')),
      totalExpense: this.store.select(CashFlowSelectors.totalCashFlow('expense')),
      transactionAmount: this.transactionAmount$,
    }).pipe(
      map((data) => [
        { label: 'totalIncome', data: { amount: data.totalIncome, isIncome: true } },
        { label: 'totalExpense', data: { amount: data.totalExpense, isIncome: false } },
        { label: 'totalBalance', data: { amount: data.totalBalance, isIncome: null } },
        { label: 'transactionAmount', data: { amount: data.transactionAmount, isIncome: null } },
      ])
    );
  }

  private get totalBalance$(): Observable<number> {
    return combineLatest({
      totalIncomes: this.store.select(CashFlowSelectors.totalCashFlow('income')),
      totalExpenses: this.store.select(CashFlowSelectors.totalCashFlow('expense')),
    }).pipe(map(({ totalIncomes, totalExpenses }) => totalIncomes - totalExpenses));
  }

  private get transactionAmount$(): Observable<number> {
    return combineLatest({
      incomesLength: this.store.select(CashFlowSelectors.cashFlow('income')).pipe(map((incomes) => incomes.length)),
      expensesLength: this.store.select(CashFlowSelectors.cashFlow('expense')).pipe(map((expenses) => expenses.length)),
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
        return cashFlow.categoryId === category.id ? total + cashFlow.amount : total;
      }, 0);
    });
  }

  private generateBgColors(amountOfColors: number, color: ChartColor) {
    const getClr = (clr: string): string => {
      return getComputedStyle(document.documentElement).getPropertyValue(clr);
    };

    return {
      backgroundColor: Array.from({ length: amountOfColors }, () => {
        const colorScale = getRandomNumber(4, 9);
        return getClr(`--${color}-${colorScale}00`);
      }),
      hoverBackgroundColor: Array.from({ length: amountOfColors }, () => {
        const colorScale = getRandomNumber(4, 9);
        return getClr(`--${color}-${colorScale - 2}00`);
      }),
    };
  }
}
