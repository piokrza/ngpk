import { Task } from '@ngpk/tasker/model';

export interface DragDropTaskPayload {
  task: Task;
  boardId: string;
  prevTaskListId: string;
  nextTaskListId: string;
}
