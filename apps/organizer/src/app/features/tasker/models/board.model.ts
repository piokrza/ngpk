import { TaskList } from '#tasker/models';

export interface Board {
  name: string;
  id: string;
  uid: string;
  tasksLists: TaskList[];
}
