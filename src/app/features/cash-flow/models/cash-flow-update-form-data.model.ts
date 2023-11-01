import { CashFlow } from '#features/cash-flow/models';

export interface CashFlowUpdateFormData {
  updatedCashFlow: CashFlow;
  isIncomeMode: boolean;
}
