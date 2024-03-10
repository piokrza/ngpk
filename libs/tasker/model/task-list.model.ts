import { Task } from '@ngpk/tasker/model';

export interface TaskList {
  name: string;
  id: string;
  tasks: Task[];
}
