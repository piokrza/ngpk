import { Category } from '#cash-flow/models';

export interface UserConfig {
  categories: { incomes: Category[]; expenses: Category[] };
  language: 'pl' | 'en';
  currency: string;
}
