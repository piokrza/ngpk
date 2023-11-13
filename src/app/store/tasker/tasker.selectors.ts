import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Task } from '#pages/dashboard/pages/tasker/models';
import { FeatureKey, State as TaskerState } from '#store/tasker';

const TaskerStateSelector = createFeatureSelector<TaskerState>(FeatureKey);

export const tasks = createSelector(TaskerStateSelector, ({ tasks }: TaskerState): Task[] => tasks);
export const isLoading = createSelector(TaskerStateSelector, ({ isLoading }: TaskerState): boolean => isLoading);