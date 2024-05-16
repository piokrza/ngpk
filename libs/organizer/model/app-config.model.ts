import { Category } from '@ngpk/organizer/model';

export type ThemeType = 'light' | 'dark';
export type AppLanguage = 'pl' | 'en';

export interface AppConfig {
  currency: string;
  theme: ThemeType;
  language: AppLanguage;
  cashFlowCategories: Array<Category>;
  uid: string;
  id: string;
}
