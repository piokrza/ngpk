import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import * as fromCategories from '@store/categories';

export interface AppState {
  [fromCategories.FeatureKey]: fromCategories.State;
}

export const ROOT_REDUCER_TOKEN: string = 'Root reducers token';

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>(ROOT_REDUCER_TOKEN, {
  factory: () => ({
    [fromCategories.FeatureKey]: fromCategories.Reducer,
  }),
});
