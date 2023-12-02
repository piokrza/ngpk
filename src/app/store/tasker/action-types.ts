export enum ActionTypes {
  GET_TASKS = '[Tasker] Get tasks',
  GET_TASKS_SUCCESS = '[Tasker] Get tasks success',
  GET_TASKS_ERROR = '[Tasker] Get tasks error',

  GET_NOTES = '[Tasks] Get notes',
  GET_NOTES_SUCCESS = '[Tasks] Get notes success',
  GET_NOTES_ERROR = '[Tasks] Get notes error',

  ADD_TASK = '[Tasks] Add task',
  ADD_TASK_SUCCESS = '[Tasks] Add task success',
  ADD_TASK_FAILURE = '[Tasks] Add task failure',

  TOGGLE_IS_TASK_COMPLETE = '[Tasks] Toggle is task complete task',
  TOGGLE_IS_TASK_COMPLETE_SUCCESS = '[Tasks] Toggle is task complete task success',
  TOGGLE_IS_TASK_COMPLETE_FAILURE = '[Tasks] Toggle is task complete task failure',

  TOGGLE_IS_STEP_COMPLETE = '[Tasks] Toggle is step complete task',
  TOGGLE_IS_STEP_COMPLETE_SUCCESS = '[Tasks] Toggle is step complete task success',
  TOGGLE_IS_STEP_COMPLETE_FAILURE = '[Tasks] Toggle is step complete task failure',

  REMOVE_TASK = '[Tasks] Remove task',
  REMOVE_TASK_SUCCESS = '[Tasks] Remove task success',
  REMOVE_TASK_FAILURE = '[Tasks] Remove task failure',

  SET_TASK_FILTER = '[Tasks] Set filter',

  ADD_NOTE = '[Notes] Add note',
  ADD_NOTE_SUCCESS = '[Notes] Add note success',
  ADD_NOTE_FAILURE = '[Notes] Add note failure',

  REMOVE_NOTE = '[Notes] Remove note',
  REMOVE_NOTE_SUCCESS = '[Notes] Remove note success',
  REMOVE_NOTE_FAILURE = '[Notes] Remove note failure',
}
