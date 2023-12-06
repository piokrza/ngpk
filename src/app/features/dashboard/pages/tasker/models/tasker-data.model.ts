import { Note, Task, TaskFilter } from '#tasker/models';

export interface TasksData {
  tasks: Task[] | null;
  filter: TaskFilter;
}

export interface NotesData {
  notes: Note[];
  filter: boolean;
}
