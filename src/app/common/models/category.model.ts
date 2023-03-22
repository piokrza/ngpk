export interface Category {
  name: string;
  code: string;
}

export interface Categories {
  expenses: Category[];
  incomes: Category[];
}
