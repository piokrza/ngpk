import { CashFlow } from '#features/cash-flow/models/cash-flow.model';

export interface CashFlowUserData {
  expenses: CashFlow[];
  incomes: CashFlow[];
}
