import { Timestamp } from '@angular/fire/firestore';

export interface Task {
  name: string;
  isComplete: boolean;
  createDate?: Timestamp;
  steps?: Task[];
  id: string;
  uid: string;
}
