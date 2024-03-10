import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

import * as fromConfig from '@ngpk/auth-organizer/config/store';
import * as fromAuth from '@ngpk/auth-organizer/state';
import * as fromDrive from '@ngpk/drive/state';
import * as fromTasker from '@ngpk/tasker/state';

import * as fromCashFlow from '#cash-flow/store';

export interface AppState {
  [fromConfig.FeatureKey]: fromConfig.State;
  [fromCashFlow.FeatureKey]: fromCashFlow.State;
  [fromAuth.FeatureKey]: fromAuth.State;
  [fromDrive.FeatureKey]: fromDrive.State;
  [fromTasker.FeatureKey]: fromTasker.State;
}

export const STORE_ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>('ROOT_REDUCERS', {
  factory: (): ActionReducerMap<AppState> => ({
    [fromConfig.FeatureKey]: fromConfig.Reducer,
    [fromCashFlow.FeatureKey]: fromCashFlow.Reducer,
    [fromAuth.FeatureKey]: fromAuth.Reducer,
    [fromDrive.FeatureKey]: fromDrive.Reducer,
    [fromTasker.FeatureKey]: fromTasker.Reducer,
  }),
});
