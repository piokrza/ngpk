import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FeatureKey, State as TaskerState } from '#store/tasker';
import { Note, Task, TaskFilter } from '#tasker/models';

const TaskerStateSelector = createFeatureSelector<TaskerState>(FeatureKey);

export const tasks = createSelector(TaskerStateSelector, ({ tasks }: TaskerState): Task[] | null => tasks);
export const notes = createSelector(TaskerStateSelector, ({ notes }: TaskerState): Note[] | null => notes);
export const isTasksLoading = createSelector(TaskerStateSelector, ({ isTasksLoading }: TaskerState): boolean => isTasksLoading);
export const isNotesLoading = createSelector(TaskerStateSelector, ({ isNotesLoading }: TaskerState): boolean => isNotesLoading);
export const taskFilter = createSelector(TaskerStateSelector, ({ taskFilter }: TaskerState): TaskFilter => taskFilter);
