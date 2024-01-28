import { Category } from '#cash-flow/models';

export interface AppConfig {
  currency: string;
  theme: 'light' | 'dark';
  language: 'pl' | 'en';
  cashFlowCategories: Array<Category>;
  uid: string;
  id: string;
}
