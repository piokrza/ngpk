import { Task } from '@ngpk/organizer/model';

export interface DragDropTaskPayload {
  task: Task;
  boardId: string;
  prevTaskListId: string;
  nextTaskListId: string;
}
