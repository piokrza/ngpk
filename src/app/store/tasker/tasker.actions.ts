import { createAction, props } from '@ngrx/store';

import { Task } from '#features/tasker/models';
import { ActionTypes } from '#store/tasker/action-types';

// get tasks user data
export const getTasksUserData = createAction(ActionTypes.GET_TASKS_USER_DATA, props<{ uid: string }>());
export const getTasksUserDataSuccess = createAction(ActionTypes.GET_TASKS_USER_DATA_SUCCESS, props<{ tasks: Task[] }>());
export const getTasksUserDataError = createAction(ActionTypes.GET_TASKS_USER_DATA_ERROR);

// add task
export const addTask = createAction(ActionTypes.ADD_TASK, props<{ task: Task }>());
export const addTaskSuccess = createAction(ActionTypes.ADD_TASK_SUCCESS);
export const addTaskFailure = createAction(ActionTypes.ADD_TASK_FAILURE);

// remove task
export const removeTask = createAction(ActionTypes.REMOVE_TASK, props<{ taskId: string }>());
export const removeTaskSuccess = createAction(ActionTypes.REMOVE_TASK_SUCCESS);
export const removeTaskFailure = createAction(ActionTypes.REMOVE_TASK_FAILURE);
