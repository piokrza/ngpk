import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Note, NoteFilter, Task, TaskFilter } from '#tasker/models';
import { FeatureKey, State as TaskerState } from '#tasker/store';

const TaskerStateSelector = createFeatureSelector<TaskerState>(FeatureKey);

export const tasks = createSelector(TaskerStateSelector, ({ tasks }: TaskerState): Task[] => tasks);
export const notes = createSelector(TaskerStateSelector, ({ notes }: TaskerState): Note[] => notes);
export const isTasksLoading = createSelector(TaskerStateSelector, ({ isTasksLoading }: TaskerState): boolean => isTasksLoading);
export const isNotesLoading = createSelector(TaskerStateSelector, ({ isNotesLoading }: TaskerState): boolean => isNotesLoading);
export const taskFilter = createSelector(TaskerStateSelector, ({ taskFilter }: TaskerState): TaskFilter => taskFilter);
export const noteFilter = createSelector(TaskerStateSelector, ({ noteFilter }: TaskerState): NoteFilter => noteFilter);
