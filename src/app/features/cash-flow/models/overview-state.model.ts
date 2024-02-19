import { ChartData } from 'chart.js';

import { LabeledData } from '#core/models';

export interface OverviewStateModel {
  isLoading: boolean;
  cashFlowDataSet: LabeledData<number>[];
  incomesChartData: ChartData | undefined;
  expensesChartData: ChartData | undefined;
}
