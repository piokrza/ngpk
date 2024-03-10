export type CategoryType = 'income' | 'expense';
export interface Category {
  name: string;
  type: CategoryType;
  id: string;
}
