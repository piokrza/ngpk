import { CashFlow } from '#cash-flow/models';

export interface CashFlowUpdateFormData {
  updatedCashFlow: CashFlow;
  isIncomeMode: boolean;
}
