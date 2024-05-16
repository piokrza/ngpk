import { ChartData } from 'chart.js';

import { LabeledData } from '@ngpk/core/model';

export interface OverviewStateModel {
  isLoading: boolean;
  cashFlowDataSet: LabeledData<CashFlowDataSet>[];
  incomesChartData: ChartData | undefined;
  expensesChartData: ChartData | undefined;
}

export interface CashFlowDataSet {
  amount: number;
  isIncome: boolean | null;
}
