import { createReducer, on } from '@ngrx/store';

import { Board } from '#tasker/models';
import { TaskerActions } from '#tasker/store';

export const FeatureKey = 'tasker';

export interface State {
  boards: Board[];
  isLoading: boolean;
}

const initialState: State = {
  boards: [],
  isLoading: false,
};

export const Reducer = createReducer(
  initialState,

  on(TaskerActions.loadBoards, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(TaskerActions.loadBoardsSuccess, (state, { boards }): State => {
    return { boards, isLoading: false };
  }),
  on(TaskerActions.loadBoardsFailure, (state): State => {
    return { ...state, isLoading: false };
  })
);
