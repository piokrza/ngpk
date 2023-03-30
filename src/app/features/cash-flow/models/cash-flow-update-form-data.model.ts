import { CashFlow } from '@features/cash-flow/models/cash-flow.model';

export interface CashFlowUpdateFormData {
  updatedIncome: CashFlow;
  isIncomeMode: boolean;
}
