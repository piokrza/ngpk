import { createAction, props } from '@ngrx/store';

import { ActionTypes } from '#store/tasker/action-types';
import { Note, Task, TaskFilter, ToggleIsStepCompletePayload } from '#tasker/models';

// get tasks user data
export const getTaskerUserData = createAction(ActionTypes.GET_TASKER_USER_DATA, props<{ uid: string }>());
export const getTaskerUserDataSuccess = createAction(ActionTypes.GET_TASKER_USER_DATA_SUCCESS, props<{ tasks: Task[]; notes: Note[] }>());
export const getTaskerUserDataError = createAction(ActionTypes.GET_TASKER_USER_DATA_ERROR);

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

// set task filter
export const setFilter = createAction(ActionTypes.SET_FILTER, props<{ filter: TaskFilter }>());

// add note
export const addNote = createAction(ActionTypes.ADD_NOTE, props<{ note: Note }>());
export const addNoteSuccess = createAction(ActionTypes.ADD_NOTE_SUCCESS);
export const addNoteFailure = createAction(ActionTypes.ADD_NOTE_FAILURE);

// remove note
export const removeNote = createAction(ActionTypes.REMOVE_NOTE, props<{ noteId: string }>());
export const removeNoteSuccess = createAction(ActionTypes.REMOVE_NOTE_SUCCESS);
export const removeNoteFailure = createAction(ActionTypes.REMOVE_NOTE_FAILURE);
