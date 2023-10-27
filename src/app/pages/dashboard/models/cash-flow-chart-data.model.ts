interface Data {
  label: string;
  amount: number;
}

export interface ExpenseChartData {
  rentalFees: Data;
  travel: Data;
  food: Data;
  entertainment: Data;
}

export interface IncomesChartData {
  concerts: Data;
  salary: Data;
  gifts: Data;
}
