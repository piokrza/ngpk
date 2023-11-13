export interface Categories {
  expenses: Category[];
  incomes: Category[];
}

export interface Category {
  name: string;
  code: number;
}
