import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IFile } from '@ngpk/organizer/model';
import { FeatureKey, State as DriveState } from '@ngpk/organizer/state/drive';

const DriveStateSelector = createFeatureSelector<DriveState>(FeatureKey);

export const files = createSelector(DriveStateSelector, ({ files }: DriveState): IFile[] => files);
export const isLoading = createSelector(DriveStateSelector, ({ isLoading }: DriveState): boolean => isLoading);
export const isProcessing = createSelector(DriveStateSelector, ({ isProcessing }: DriveState): boolean => isProcessing);

export const fileById = (fileId: string) => {
  return createSelector(DriveStateSelector, ({ files }: DriveState): IFile | undefined => files?.find(({ id }) => id === fileId));
};
