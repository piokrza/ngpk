import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FeatureKey, State as TaskerState } from '#tasker/store';

const TaskerStateSelector = createFeatureSelector<TaskerState>(FeatureKey);

export const boards = createSelector(TaskerStateSelector, ({ boards }: TaskerState) => boards);
export const isLoading = createSelector(TaskerStateSelector, ({ isLoading }: TaskerState) => isLoading);
