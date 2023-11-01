import { CashFlow } from '#features/cash-flow/models';

export interface CashFlowUserData {
  expenses: CashFlow[];
  incomes: CashFlow[];
}
