import { Timestamp } from '@angular/fire/firestore';

import { CashFlowType } from '@ngpk/organizer/model';

export interface CashFlow {
  name: string;
  amount: number;
  date: Timestamp;
  type: CashFlowType;
  categoryId: string;
  description: string;
  id: string;
  uid: string;
}
