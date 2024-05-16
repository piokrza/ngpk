import { TaskList } from '@ngpk/organizer/model';

export interface Board {
  name: string;
  id: string;
  uid: string;
  tasksLists: TaskList[];
}
