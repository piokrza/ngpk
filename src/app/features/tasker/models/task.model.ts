import { Board } from '#tasker/enums';

export interface Task {
  id: string;
  name: string;
  description: string;
  boardType: Board;
}
