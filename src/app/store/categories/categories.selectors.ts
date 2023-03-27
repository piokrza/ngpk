import { Categories } from '@common/models/category.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureKey, State as CategoriesState } from '@store/categories';

const CategoriesStateSelector = createFeatureSelector<CategoriesState>(FeatureKey);

export const categories = createSelector(
  CategoriesStateSelector,
  ({ categories }: CategoriesState): Categories | null => categories
);
