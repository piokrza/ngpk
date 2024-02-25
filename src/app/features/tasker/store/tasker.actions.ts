import { createAction, props } from '@ngrx/store';

import { Board } from '#tasker/models';
import { ActionTypes } from '#tasker/store/action-types';

export const loadBoards = createAction(ActionTypes.LOAD_BOARDS, props<{ uid: string }>());
export const loadBoardsSuccess = createAction(ActionTypes.LOAD_BOARDS_SUCCESS, props<{ boards: Board[] }>());
export const loadBoardsFailure = createAction(ActionTypes.LOAD_BOARDS_FAILURE);

export const setActiveBoard = createAction(ActionTypes.SET_ACTIVE_BOARD, props<{ id: string }>());
