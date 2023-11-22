import { Note, Task, TaskFilter } from '#tasker/models';

export interface TaskerDataset {
  tasks: Task[] | null;
  notes: Note[] | null;
  isLoading: boolean;
  filter: TaskFilter;
}
