import { Board } from '#tasker/models';

export interface BoardsState {
  boards: Array<Board>;
  isLoading: boolean;
  userId: string;
}
