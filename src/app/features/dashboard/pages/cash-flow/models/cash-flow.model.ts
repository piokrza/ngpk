import { Timestamp } from '@angular/fire/firestore';

export interface CashFlow {
  name: string;
  amount: number;
  date: Timestamp;
  categoryCode: number;
  description: string;
  id: string;
  uid: string;
}
