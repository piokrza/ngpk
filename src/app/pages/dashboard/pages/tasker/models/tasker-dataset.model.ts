import { Task } from '#pages/dashboard/pages/tasker/models';

export interface TaskerDataset {
  tasks: Task[];
  isLoading: boolean;
}
