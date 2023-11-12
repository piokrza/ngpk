import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import { Task } from '#pages/dashboard/pages/tasker/models';
import { AuthActions } from '#store/auth';
import { TaskerActions } from '#store/tasker';

export const FeatureKey = 'tasker';

export interface State {
  tasks: Task[];
  isLoading: boolean;
}

const initialState: State = {
  tasks: [],
  isLoading: false,
};

export const Reducer: ActionReducer<State, Action> = createReducer(
  initialState,

  // get tasks data
  on(TaskerActions.getTasksUserData, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(TaskerActions.getTasksUserDataSuccess, (_: State, { tasks }): State => {
    return { tasks, isLoading: false };
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

  // on signout
  on(AuthActions.signOut, (): State => {
    return { isLoading: false, tasks: [] };
  })
);
