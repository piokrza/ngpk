import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import { AuthActions } from '#auth/store';
import { Note, NoteFilter, Task, TaskFilter } from '#tasker/models';
import { TaskerActions } from '#tasker/store';

export const FeatureKey = 'tasker';

export interface State {
  tasks: Task[];
  notes: Note[];
  isTasksLoading: boolean;
  isNotesLoading: boolean;
  taskFilter: TaskFilter;
  noteFilter: NoteFilter;
}

const initialState: State = {
  tasks: [],
  notes: [],
  isTasksLoading: false,
  isNotesLoading: false,
  taskFilter: 'all',
  noteFilter: 'newest',
};

export const Reducer: ActionReducer<State, Action> = createReducer(
  initialState,

  on(TaskerActions.loadTasks, (state): State => {
    return {
      ...state,
      isTasksLoading: true,
    };
  }),
  on(TaskerActions.loadTasksSuccess, (state: State, { tasks }): State => {
    return {
      ...state,
      tasks,
      isTasksLoading: false,
    };
  }),
  on(TaskerActions.loadTasksError, (state): State => {
    return {
      ...state,
      isTasksLoading: false,
    };
  }),
  on(TaskerActions.loadNotes, (state): State => {
    return {
      ...state,
      isNotesLoading: true,
    };
  }),
  on(TaskerActions.loadNotesSuccess, (state: State, { notes }): State => {
    return {
      ...state,
      notes,
      isNotesLoading: false,
    };
  }),
  on(TaskerActions.loadNotesError, (state): State => {
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
  on(TaskerActions.addNote, (state, { note }): State => {
    return {
      ...state,
      notes: [...(state.notes as Note[]), note],
    };
  }),
  on(TaskerActions.setTaskFilter, (state, { taskFilter }): State => ({ ...state, taskFilter })),
  on(TaskerActions.setNoteFilter, (state, { noteFilter }): State => ({ ...state, noteFilter })),

  on(AuthActions.signOut, (state): State => {
    return {
      ...state,
      taskFilter: 'all',
      tasks: [],
      notes: [],
    };
  })
);
