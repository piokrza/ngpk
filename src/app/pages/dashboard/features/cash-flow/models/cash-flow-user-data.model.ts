import { CashFlow } from '#pages/dashboard/features/cash-flow/models';

export interface CashFlowUserData {
  expenses: CashFlow[];
  incomes: CashFlow[];
}
