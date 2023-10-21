import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '#store/auth';
import * as fromIncomes from '#store/cash-flow';
import * as fromCategories from '#store/categories';

export interface AppState {
  [fromCategories.FeatureKey]: fromCategories.State;
  [fromIncomes.FeatureKey]: fromIncomes.State;
  [fromAuth.FeatureKey]: fromAuth.State;
}

export const ROOT_REDUCER_TOKEN: string = 'Root reducers token';

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>(ROOT_REDUCER_TOKEN, {
  factory: (): ActionReducerMap<AppState> => ({
    [fromCategories.FeatureKey]: fromCategories.Reducer,
    [fromIncomes.FeatureKey]: fromIncomes.Reducer,
    [fromAuth.FeatureKey]: fromAuth.Reducer,
  }),
});
