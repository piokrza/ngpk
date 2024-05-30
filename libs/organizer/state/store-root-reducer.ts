import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '@ngpk/organizer/state/auth';
import * as fromCashFlow from '@ngpk/organizer/state/cash-flow';
import * as fromConfig from '@ngpk/organizer/state/config';
import * as fromDrive from '@ngpk/organizer/state/drive';
import * as fromTasker from '@ngpk/organizer/state/tasker';

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
