import { Categories } from '@common/models/category.model';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@store/categories/action-types';

export const getCategories = createAction(ActionTypes.GET_CATEGORIES);
export const getCategoriesSuccess = createAction(
  ActionTypes.GET_CATEGORIES_SUCCESS,
  props<{ categories: Categories }>()
);
export const getCategoriesFailure = createAction(ActionTypes.GET_CATEGORIES_FAILURE);
