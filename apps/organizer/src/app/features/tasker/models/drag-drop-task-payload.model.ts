import { Task } from '#tasker/models';

export interface DragDropTaskPayload {
  task: Task;
  boardId: string;
  prevTaskListId: string;
  nextTaskListId: string;
}
