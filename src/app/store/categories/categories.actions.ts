import { Category } from '@app/common/models/category.model';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@store/categories/action-types';

export const getCategories = createAction(ActionTypes.getCategories);
export const getCategoriesSuccess = createAction(ActionTypes.getCategoriesSuccess, props<{ categories: Category[] }>());
export const getCategoriesFailure = createAction(
  ActionTypes.getCategoriesFailure,
  props<{ mockedCategories: Category[] }>()
);
