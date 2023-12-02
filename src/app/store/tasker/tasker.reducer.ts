import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import { AuthActions } from '#store/auth';
import { TaskerActions } from '#store/tasker';
import { Note, Task, TaskFilter } from '#tasker/models';

export const FeatureKey = 'tasker';

export interface State {
  tasks: Task[] | null;
  notes: Note[] | null;
  isTasksLoading: boolean;
  isNotesLoading: boolean;
  taskFilter: TaskFilter;
}

const initialState: State = {
  tasks: null,
  notes: null,
  isTasksLoading: false,
  isNotesLoading: false,
  taskFilter: 'all',
};

export const Reducer: ActionReducer<State, Action> = createReducer(
  initialState,

  on(TaskerActions.getTasks, (state): State => {
    return {
      ...state,
      isTasksLoading: true,
    };
  }),
  on(TaskerActions.getTasksSuccess, (state: State, { tasks }): State => {
    return {
      ...state,
      tasks,
      isTasksLoading: false,
    };
  }),
  on(TaskerActions.getTasksError, (state): State => {
    return {
      ...state,
      isTasksLoading: false,
    };
  }),

  on(TaskerActions.getNotes, (state): State => {
    return {
      ...state,
      isNotesLoading: true,
    };
  }),
  on(TaskerActions.getNotesSuccess, (state: State, { notes }): State => {
    return {
      ...state,
      notes,
      isNotesLoading: false,
    };
  }),
  on(TaskerActions.getNotesError, (state): State => {
    return {
      ...state,
      isNotesLoading: false,
    };
  }),

  on(TaskerActions.addTask, (state, { task }): State => {
    return {
      ...state,
      tasks: [...(state.tasks as Task[]), task],
    };
  }),
  on(TaskerActions.addTaskSuccess, (state): State => ({ ...state })),
  on(TaskerActions.addTaskFailure, (state): State => ({ ...state })),

  on(TaskerActions.addNote, (state, { note }): State => {
    return {
      ...state,
      notes: [...(state.notes as Note[]), note],
    };
  }),
  on(TaskerActions.addNoteSuccess, (state): State => ({ ...state })),
  on(TaskerActions.addNoteFailure, (state): State => ({ ...state })),

  on(TaskerActions.setTaskFilter, (state, { taskFilter }): State => ({ ...state, taskFilter })),

  on(AuthActions.signOut, (state): State => {
    return {
      ...state,
      taskFilter: 'all',
      tasks: null,
      notes: null,
    };
  })
);
