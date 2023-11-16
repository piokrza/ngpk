import { createAction, props } from '@ngrx/store';

import { Task, TaskFilter, ToggleIsStepCompletePayload } from '#pages/dashboard/features/tasker/models';
import { ActionTypes } from '#store/tasker/action-types';

// get tasks user data
export const getTasksUserData = createAction(ActionTypes.GET_TASKS_USER_DATA, props<{ uid: string }>());
export const getTasksUserDataSuccess = createAction(ActionTypes.GET_TASKS_USER_DATA_SUCCESS, props<{ tasks: Task[] }>());
export const getTasksUserDataError = createAction(ActionTypes.GET_TASKS_USER_DATA_ERROR);

// add task
export const addTask = createAction(ActionTypes.ADD_TASK, props<{ task: Task }>());
export const addTaskSuccess = createAction(ActionTypes.ADD_TASK_SUCCESS);
export const addTaskFailure = createAction(ActionTypes.ADD_TASK_FAILURE);

// toggle is task complete
export const toggleIsTaskComplete = createAction(ActionTypes.TOGGLE_IS_TASK_COMPLETE, props<{ taskId: string }>());
export const toggleIsTaskCompleteSuccess = createAction(ActionTypes.TOGGLE_IS_TASK_COMPLETE_SUCCESS);
export const toggleIsTaskCompleteFailure = createAction(ActionTypes.TOGGLE_IS_TASK_COMPLETE_FAILURE);

// toggle is step complete
export const toggleIsStepComplete = createAction(ActionTypes.TOGGLE_IS_STEP_COMPLETE, props<{ payload: ToggleIsStepCompletePayload }>());
export const toggleIsStepCompleteSuccess = createAction(ActionTypes.TOGGLE_IS_STEP_COMPLETE_SUCCESS);
export const toggleIsStepCompleteFailure = createAction(ActionTypes.TOGGLE_IS_STEP_COMPLETE_FAILURE);

// remove task
export const removeTask = createAction(ActionTypes.REMOVE_TASK, props<{ taskId: string }>());
export const removeTaskSuccess = createAction(ActionTypes.REMOVE_TASK_SUCCESS);
export const removeTaskFailure = createAction(ActionTypes.REMOVE_TASK_FAILURE);

// set filter
export const setFilter = createAction(ActionTypes.SET_FILTER, props<{ filter: TaskFilter }>());
