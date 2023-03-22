import { Categories } from '@common/models/category.model';
import { createReducer, on } from '@ngrx/store';
import { CategoriesActions } from '@store/categories';

export const FeatureKey = 'categories';

export interface State {
  categories: Categories | null;
  isLoading: boolean;
}

const initialState: State = {
  categories: null,
  isLoading: false,
};

export const Reducer = createReducer(
  initialState,

  // get categories
  on(CategoriesActions.getCategories, (state) => {
    return { ...state, isLoading: true };
  }),
  on(CategoriesActions.getCategoriesSuccess, (_, { categories }) => {
    return { categories, isLoading: false };
  }),
  on(CategoriesActions.getCategoriesFailure, (_, { mockedCategories }) => {
    return { categories: mockedCategories, isLoading: true };
  })
);
