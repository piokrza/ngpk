import { Task, TaskFilter } from '#tasker/models';

export interface TasksData {
  tasks: Task[] | null;
  filter: TaskFilter;
}
