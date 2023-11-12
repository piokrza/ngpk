import { CashFlow } from '#pages/dashboard/pages/cash-flow/models';

export interface CashFlowUserData {
  expenses: CashFlow[];
  incomes: CashFlow[];
}
