import { Board } from '#tasker/enums';

export interface AddTaskPayload {
  taskName: string;
  boardType: Board;
  boardId: string;
}
