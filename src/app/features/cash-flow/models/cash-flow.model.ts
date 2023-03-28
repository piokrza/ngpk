import { Timestamp } from '@angular/fire/firestore';

export interface CashFlow {
  name: string;
  amount: number;
  date: Timestamp | null;
  categoryCode: number | null;
  description: string;
  id?: string;
  uid: string;
}
