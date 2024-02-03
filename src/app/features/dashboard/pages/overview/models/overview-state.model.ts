import { ChartData } from 'chart.js';

import { LabeledData } from '#core/models';
import { TaskerData } from '#overview/models';

export interface OverviewStateModel {
  taskerData: TaskerData;
  isLoading: boolean;
  cashFlowDataSet: LabeledData<number>[];
  incomesChartData: ChartData | undefined;
  expensesChartData: ChartData | undefined;
}
