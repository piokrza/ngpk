import { Timestamp } from '@angular/fire/firestore';

import { CashFlowType } from '#cash-flow/models';

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
