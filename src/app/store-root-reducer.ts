import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '#auth/store';
import * as fromCashFlow from '#cash-flow/store';
import * as fromDrive from '#drive/store';
import * as fromTasker from '#tasker/store';

export interface AppState {
  [fromCashFlow.FeatureKey]: fromCashFlow.State;
  [fromAuth.FeatureKey]: fromAuth.State;
  [fromTasker.FeatureKey]: fromTasker.State;
  [fromDrive.FeatureKey]: fromDrive.State;
}

export const STORE_ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>('ROOT_REDUCERS', {
  factory: (): ActionReducerMap<AppState> => ({
    [fromCashFlow.FeatureKey]: fromCashFlow.Reducer,
    [fromAuth.FeatureKey]: fromAuth.Reducer,
    [fromTasker.FeatureKey]: fromTasker.Reducer,
    [fromDrive.FeatureKey]: fromDrive.Reducer,
  }),
});
