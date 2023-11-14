import { CashFlow } from '#pages/dashboard/features/cash-flow/models';

export interface CashFlowUpdateFormData {
  updatedCashFlow: CashFlow;
  isIncomeMode: boolean;
}
