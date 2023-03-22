import { InjectionToken } from '@angular/core';
import * as fromIncomes from '@app/store/cash-flow';
import { ActionReducerMap } from '@ngrx/store';
import * as fromCategories from '@store/categories';

export interface AppState {
  [fromCategories.FeatureKey]: fromCategories.State;
  [fromIncomes.FeatureKey]: fromIncomes.State;
}

export const ROOT_REDUCER_TOKEN: string = 'Root reducers token';

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>(ROOT_REDUCER_TOKEN, {
  factory: () => ({
    [fromCategories.FeatureKey]: fromCategories.Reducer,
    [fromIncomes.FeatureKey]: fromIncomes.Reducer,
  }),
});
