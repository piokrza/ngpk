import { CashFlow } from '#cash-flow/models';

export interface CashFlowUserData {
  expenses: CashFlow[];
  incomes: CashFlow[];
}
