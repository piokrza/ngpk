import { createAction, props } from '@ngrx/store';

import { Task } from '#features/tasker/models';
import { ActionTypes } from '#store/tasker/action-types';

export const getTasksUserData = createAction(ActionTypes.GET_TASKS_USER_DATA, props<{ uid: string }>());
export const getTasksUserDataSuccess = createAction(ActionTypes.GET_TASKS_USER_DATA_SUCCESS, props<{ tasks: Task[] }>());
export const getTasksUserDataError = createAction(ActionTypes.GET_TASKS_USER_DATA_ERROR);
