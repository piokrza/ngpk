import { Category } from '@common/models/category.model';
import { createReducer, on } from '@ngrx/store';
import { CategoriesActions } from '.';

export const FeatureKey = 'categories';

export interface State {
  categories: Category[];
  isLoading: boolean;
}

const initialState: State = {
  categories: [],
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
  on(CategoriesActions.getCategoriesFailure, (state, { mockedCategories }) => {
    return { categories: mockedCategories, isLoading: true };
  })
);
