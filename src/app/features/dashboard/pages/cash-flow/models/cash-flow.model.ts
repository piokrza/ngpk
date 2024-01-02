import { Timestamp } from '@angular/fire/firestore';

export interface CashFlow {
  name: string;
  amount: number;
  date: Timestamp;
  categoryId: string;
  description: string;
  id: string;
  uid: string;
}
