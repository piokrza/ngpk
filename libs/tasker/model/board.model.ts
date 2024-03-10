import { TaskList } from '@ngpk/tasker/model';

export interface Board {
  name: string;
  id: string;
  uid: string;
  tasksLists: TaskList[];
}
