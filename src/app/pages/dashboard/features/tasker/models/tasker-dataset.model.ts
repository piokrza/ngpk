import { Note, Task, TaskFilter } from '#pages/dashboard/features/tasker/models';

export interface TaskerDataset {
  tasks: Task[] | null;
  notes: Note[] | null;
  isLoading: boolean;
  filter: TaskFilter;
}
