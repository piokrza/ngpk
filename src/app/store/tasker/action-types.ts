export enum ActionTypes {
  GET_TASKER_USER_DATA = '[Tasks] Get tasker user data',
  GET_TASKER_USER_DATA_SUCCESS = '[Tasks] Get tasker user data success',
  GET_TASKER_USER_DATA_ERROR = '[Tasks] Get tasker user data error',

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

  SET_FILTER = '[Tasks] Set filter',

  ADD_NOTE = '[Notes] Add note',
  ADD_NOTE_SUCCESS = '[Notes] Add note success',
  ADD_NOTE_FAILURE = '[Notes] Add note failure',

  REMOVE_NOTE = '[Notes] Remove note',
  REMOVE_NOTE_SUCCESS = '[Notes] Remove note success',
  REMOVE_NOTE_FAILURE = '[Notes] Remove note failure',
}
