import { Categories } from '@common/models/category.model';
import { createReducer, on } from '@ngrx/store';
import { CategoriesActions } from '@store/categories';

export const FeatureKey = 'categories';

export interface State {
  categories: Categories | null;
}

const initialState: State = {
  categories: null,
};

export const Reducer = createReducer(
  initialState,

  // get categories
  on(CategoriesActions.getCategories, (state) => {
    return { ...state };
  }),
  on(CategoriesActions.getCategoriesSuccess, (_, { categories }) => {
    return { categories };
  }),
  on(CategoriesActions.getCategoriesFailure, (state) => {
    return { ...state };
  })
);
