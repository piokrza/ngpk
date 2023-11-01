import { Task } from '#features/tasker/models';

export interface TaskerDataset {
  tasks: Task[];
  isLoading: boolean;
}
