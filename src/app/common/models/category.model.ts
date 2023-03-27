export interface Category {
  name: string;
  code: number;
}

export interface Categories {
  expenses: Category[];
  incomes: Category[];
}
