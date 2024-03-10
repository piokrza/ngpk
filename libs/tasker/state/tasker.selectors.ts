import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FeatureKey, State as TaskerState } from '@ngpk/tasker/state';

const TaskerStateSelector = createFeatureSelector<TaskerState>(FeatureKey);

export const boards = createSelector(TaskerStateSelector, ({ boards }: TaskerState) => boards);
export const isLoading = createSelector(TaskerStateSelector, ({ isLoading }: TaskerState) => isLoading);
export const activeBoard = createSelector(TaskerStateSelector, ({ boards, activeBoardId }: TaskerState) => {
  return boards.find((board) => board.id === activeBoardId);
});
