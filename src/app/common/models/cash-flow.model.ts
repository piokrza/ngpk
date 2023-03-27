export interface CashFlow {
  name: string;
  amount: number;
  date: Date | null;
  categoryCode: number | null;
  description: string;
  id: string;
}
