export enum ActionTypes {
  LOAD_TASKS = '[Tasker] Load tasks',
  LOAD_TASKS_SUCCESS = '[Tasker] Load tasks success',
  LOAD_TASKS_ERROR = '[Tasker] Load tasks error',

  LOAD_NOTES = '[Tasks] Load notes',
  LOAD_NOTES_SUCCESS = '[Tasks] Load notes success',
  LOAD_NOTES_ERROR = '[Tasks] Load notes error',

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

  EDIT_TASK = '[Tasks] Edit task',
  EDIT_TASK_SUCCESS = '[Tasks] Edit task success',
  EDIT_TASK_FAILURE = '[Tasks] Edit task failure',

  SET_TASK_FILTER = '[Tasks] Set task filter',

  ADD_NOTE = '[Notes] Add note',
  ADD_NOTE_SUCCESS = '[Notes] Add note success',
  ADD_NOTE_FAILURE = '[Notes] Add note failure',

  EDIT_NOTE = '[Notes] Edit note',
  EDIT_NOTE_SUCCESS = '[Notes] Edit note success',
  EDIT_NOTE_FAILURE = '[Notes] Edit note failure',

  REMOVE_NOTE = '[Notes] Remove note',
  REMOVE_NOTE_SUCCESS = '[Notes] Remove note success',
  REMOVE_NOTE_FAILURE = '[Notes] Remove note failure',

  SET_NOTE_FILTER = '[Tasks] Set note filter',
}
