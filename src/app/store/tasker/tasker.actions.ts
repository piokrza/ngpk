import { createAction, props } from '@ngrx/store';

import { ActionTypes } from '#store/tasker/action-types';
import { Note, Task, TaskFilter, ToggleIsStepCompletePayload } from '#tasker/models';

export const getTasks = createAction(ActionTypes.GET_TASKS, props<{ uid: string }>());
export const getTasksSuccess = createAction(ActionTypes.GET_TASKS_SUCCESS, props<{ tasks: Task[] }>());
export const getTasksError = createAction(ActionTypes.GET_TASKS_ERROR);

export const getNotes = createAction(ActionTypes.GET_NOTES, props<{ uid: string }>());
export const getNotesSuccess = createAction(ActionTypes.GET_NOTES_SUCCESS, props<{ notes: Note[] }>());
export const getNotesError = createAction(ActionTypes.GET_NOTES_ERROR);

export const addTask = createAction(ActionTypes.ADD_TASK, props<{ task: Task }>());
export const addTaskSuccess = createAction(ActionTypes.ADD_TASK_SUCCESS);
export const addTaskFailure = createAction(ActionTypes.ADD_TASK_FAILURE);

export const toggleIsTaskComplete = createAction(ActionTypes.TOGGLE_IS_TASK_COMPLETE, props<{ taskId: string }>());
export const toggleIsTaskCompleteSuccess = createAction(ActionTypes.TOGGLE_IS_TASK_COMPLETE_SUCCESS);
export const toggleIsTaskCompleteFailure = createAction(ActionTypes.TOGGLE_IS_TASK_COMPLETE_FAILURE);

export const toggleIsStepComplete = createAction(ActionTypes.TOGGLE_IS_STEP_COMPLETE, props<{ payload: ToggleIsStepCompletePayload }>());
export const toggleIsStepCompleteSuccess = createAction(ActionTypes.TOGGLE_IS_STEP_COMPLETE_SUCCESS);
export const toggleIsStepCompleteFailure = createAction(ActionTypes.TOGGLE_IS_STEP_COMPLETE_FAILURE);

export const removeTask = createAction(ActionTypes.REMOVE_TASK, props<{ taskId: string }>());
export const removeTaskSuccess = createAction(ActionTypes.REMOVE_TASK_SUCCESS);
export const removeTaskFailure = createAction(ActionTypes.REMOVE_TASK_FAILURE);

export const setTaskFilter = createAction(ActionTypes.SET_TASK_FILTER, props<{ taskFilter: TaskFilter }>());

export const addNote = createAction(ActionTypes.ADD_NOTE, props<{ note: Note }>());
export const addNoteSuccess = createAction(ActionTypes.ADD_NOTE_SUCCESS);
export const addNoteFailure = createAction(ActionTypes.ADD_NOTE_FAILURE);

export const removeNote = createAction(ActionTypes.REMOVE_NOTE, props<{ noteId: string }>());
export const removeNoteSuccess = createAction(ActionTypes.REMOVE_NOTE_SUCCESS);
export const removeNoteFailure = createAction(ActionTypes.REMOVE_NOTE_FAILURE);
