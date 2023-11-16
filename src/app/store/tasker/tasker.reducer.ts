import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import { Task, TaskFilter } from '#pages/dashboard/features/tasker/models';
import { AuthActions } from '#store/auth';
import { TaskerActions } from '#store/tasker';

export const FeatureKey = 'tasker';

export interface State {
  tasks: Task[];
  isLoading: boolean;
  filter: TaskFilter;
}

const initialState: State = {
  tasks: [],
  isLoading: false,
  filter: 'all',
};

export const Reducer: ActionReducer<State, Action> = createReducer(
  initialState,

  // get tasks data
  on(TaskerActions.getTasksUserData, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(TaskerActions.getTasksUserDataSuccess, (state: State, { tasks }): State => {
    return { ...state, tasks, isLoading: false };
  }),
  on(TaskerActions.getTasksUserDataError, (state): State => {
    return { ...state, isLoading: false };
  }),

  // add task
  on(TaskerActions.addTask, (state, { task }): State => {
    return { ...state, tasks: [...state.tasks, task] };
  }),
  on(TaskerActions.addTaskSuccess, (state): State => {
    return { ...state };
  }),
  on(TaskerActions.addTaskFailure, (state): State => {
    return { ...state };
  }),

  // set filter
  on(TaskerActions.setFilter, (state, { filter }) => {
    return { ...state, filter };
  }),

  // on signout
  on(AuthActions.signOut, (): State => {
    return { filter: 'all', isLoading: false, tasks: [] };
  })
);
