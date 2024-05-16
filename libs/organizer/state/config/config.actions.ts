import { createAction, props } from '@ngrx/store';

import { AppConfig } from '@ngpk/organizer/model';
import { ActionTypes } from '@ngpk/organizer/state/config/action-types';

export const loadConfig = createAction(ActionTypes.LOAD_CONFIG, props<{ uid: string }>());
export const loadConfigSuccess = createAction(ActionTypes.LOAD_CONFIG_SUCCESS, props<{ config: AppConfig }>());
export const loadConfigFailure = createAction(ActionTypes.LOAD_CONFIG_FAILURE);

export const updateConfig = createAction(ActionTypes.UPDATE_CONFIG, props<{ config: AppConfig }>());
export const updateConfigSuccess = createAction(ActionTypes.UPDATE_CONFIG_SUCCESS);
export const updateConfigFailure = createAction(ActionTypes.UPDATE_CONFIG_FAILURE);
