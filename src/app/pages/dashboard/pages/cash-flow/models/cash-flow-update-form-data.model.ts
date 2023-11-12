import { CashFlow } from '#pages/dashboard/pages/cash-flow/models';

export interface CashFlowUpdateFormData {
  updatedCashFlow: CashFlow;
  isIncomeMode: boolean;
}
