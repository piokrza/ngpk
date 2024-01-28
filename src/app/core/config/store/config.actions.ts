import { createAction, props } from '@ngrx/store';

import { AppConfig } from '#core/config/models';
import { ActionTypes } from '#core/config/store/action-types';

export const loadConfig = createAction(ActionTypes.LOAD_CONFIG, props<{ uid: string }>());
export const loadConfigSuccess = createAction(ActionTypes.LOAD_CONFIG_SUCCESS, props<{ config: AppConfig }>());
export const loadConfigFailure = createAction(ActionTypes.LOAD_CONFIG_FAILURE);
