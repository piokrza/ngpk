import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '#store/auth';
import * as fromCashFlow from '#store/cash-flow';
import * as fromCategories from '#store/categories';
import * as fromDrive from '#store/drive';
import * as fromTasker from '#store/tasker';

export interface AppState {
  [fromCategories.FeatureKey]: fromCategories.State;
  [fromCashFlow.FeatureKey]: fromCashFlow.State;
  [fromAuth.FeatureKey]: fromAuth.State;
  [fromTasker.FeatureKey]: fromTasker.State;
  [fromDrive.FeatureKey]: fromDrive.State;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>('ROOT_REDUCERS', {
  factory: (): ActionReducerMap<AppState> => ({
    [fromCategories.FeatureKey]: fromCategories.Reducer,
    [fromCashFlow.FeatureKey]: fromCashFlow.Reducer,
    [fromAuth.FeatureKey]: fromAuth.Reducer,
    [fromTasker.FeatureKey]: fromTasker.Reducer,
    [fromDrive.FeatureKey]: fromDrive.Reducer,
  }),
});
