import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IFile } from '#dashboard/features/drive/models';
import { FeatureKey, State as DriveState } from '#store/drive';

const DriveStateSelector = createFeatureSelector<DriveState>(FeatureKey);

export const files = createSelector(DriveStateSelector, ({ files }: DriveState): IFile[] | null => files);
export const isLoading = createSelector(DriveStateSelector, ({ isLoading }: DriveState): boolean => isLoading);
