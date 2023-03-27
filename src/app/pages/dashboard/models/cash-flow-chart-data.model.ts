interface Data {
  label: string;
  amount: number;
}

export interface CashFlowExpenseChartData {
  rentalFees: Data;
  travel: Data;
  food: Data;
  entertainment: Data;
}

export interface CashFlowIncomesChartData {
  concerts: Data;
  salary: Data;
  gifts: Data;
}
