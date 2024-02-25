import { Task } from '#tasker/models';

export interface Board {
  name: string;
  id: string;
  uid: string;
  todoTasks: Task[];
  doingTasks: Task[];
  doneTasks: Task[];
}
