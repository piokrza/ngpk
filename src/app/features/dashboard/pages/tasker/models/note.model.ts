import { Timestamp } from '@angular/fire/firestore';

export interface Note {
  name: string;
  content: string;
  uid: string;
  id: string;
  createDate: Timestamp;
}
