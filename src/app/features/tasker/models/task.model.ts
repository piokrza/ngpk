import { Timestamp } from '@angular/fire/firestore';

export interface Task {
  name: string;
  isComplete: boolean;
  createDate?: Timestamp;
  steps: TaskStep[];
  id: string;
  uid: string;
}

export type TaskStep = Pick<Task, 'name' | 'isComplete'>;
