import { Task } from '#tasker/models';

export interface Board {
  name: string;
  id: string;
  uid: string;
  todo: Task[];
  doing: Task[];
  done: Task[];
}
