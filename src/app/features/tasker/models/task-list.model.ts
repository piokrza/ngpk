import { Task } from '#tasker/models';

export interface TaskList {
  name: string;
  id: string;
  items: Task[];
}
