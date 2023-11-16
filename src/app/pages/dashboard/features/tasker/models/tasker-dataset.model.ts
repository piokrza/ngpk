import { Task, TaskFilter } from '#pages/dashboard/features/tasker/models';

export interface TaskerDataset {
  tasks: Task[];
  isLoading: boolean;
  filter: TaskFilter;
}
