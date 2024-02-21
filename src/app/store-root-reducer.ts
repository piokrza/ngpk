import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '#auth/store';
import * as fromCashFlow from '#cash-flow/store';
import * as fromConfig from '#core/config/store';
import * as fromDrive from '#drive/store';

export interface AppState {
  [fromConfig.FeatureKey]: fromConfig.State;
  [fromCashFlow.FeatureKey]: fromCashFlow.State;
  [fromAuth.FeatureKey]: fromAuth.State;
  [fromDrive.FeatureKey]: fromDrive.State;
}

export const STORE_ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>('ROOT_REDUCERS', {
  factory: (): ActionReducerMap<AppState> => ({
    [fromConfig.FeatureKey]: fromConfig.Reducer,
    [fromCashFlow.FeatureKey]: fromCashFlow.Reducer,
    [fromAuth.FeatureKey]: fromAuth.Reducer,
    [fromDrive.FeatureKey]: fromDrive.Reducer,
  }),
});
