import { Timestamp } from '@angular/fire/firestore';

export interface CashFlow {
  name: string;
  amount: number;
  date: Timestamp;
  type: 'income' | 'expense';
  categoryId: string;
  description: string;
  id: string;
  uid: string;
}
