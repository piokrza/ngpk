import { Task } from '@ngpk/organizer/model';

export interface TaskList {
  name: string;
  id: string;
  tasks: Task[];
}
