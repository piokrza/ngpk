import { createAction, props } from '@ngrx/store';

import { Note, NoteFilter, Task, TaskFilter, ToggleIsStepCompletePayload } from '#tasker/models';
import { ActionTypes } from '#tasker/store/action-types';

export const loadTasks = createAction(ActionTypes.LOAD_TASKS, props<{ uid: string }>());
export const loadTasksSuccess = createAction(ActionTypes.LOAD_TASKS_SUCCESS, props<{ tasks: Task[] }>());
export const loadTasksError = createAction(ActionTypes.LOAD_TASKS_ERROR);

export const loadNotes = createAction(ActionTypes.LOAD_NOTES, props<{ uid: string }>());
export const loadNotesSuccess = createAction(ActionTypes.LOAD_NOTES_SUCCESS, props<{ notes: Note[] }>());
export const loadNotesError = createAction(ActionTypes.LOAD_NOTES_ERROR);

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

export const editTask = createAction(ActionTypes.EDIT_TASK, props<{ editedTask: Task }>());
export const editTaskSuccess = createAction(ActionTypes.EDIT_TASK_SUCCESS);
export const editTaskFailure = createAction(ActionTypes.EDIT_TASK_FAILURE);

export const editNote = createAction(ActionTypes.EDIT_NOTE, props<{ editedNote: Note }>());
export const editNoteSuccess = createAction(ActionTypes.EDIT_NOTE_SUCCESS);
export const editNoteFailure = createAction(ActionTypes.EDIT_NOTE_FAILURE);

export const setTaskFilter = createAction(ActionTypes.SET_TASK_FILTER, props<{ taskFilter: TaskFilter }>());

export const addNote = createAction(ActionTypes.ADD_NOTE, props<{ note: Note }>());
export const addNoteSuccess = createAction(ActionTypes.ADD_NOTE_SUCCESS);
export const addNoteFailure = createAction(ActionTypes.ADD_NOTE_FAILURE);

export const removeNote = createAction(ActionTypes.REMOVE_NOTE, props<{ noteId: string }>());
export const removeNoteSuccess = createAction(ActionTypes.REMOVE_NOTE_SUCCESS);
export const removeNoteFailure = createAction(ActionTypes.REMOVE_NOTE_FAILURE);

export const setNoteFilter = createAction(ActionTypes.SET_NOTE_FILTER, props<{ noteFilter: NoteFilter }>());
