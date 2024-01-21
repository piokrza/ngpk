import { createReducer, on } from '@ngrx/store';

import { AuthActions } from '#auth/store';
import { IFile } from '#drive/models';
import { DriveActions } from '#drive/store';

export const FeatureKey = 'drive';

export interface State {
  files: IFile[];
  isLoading: boolean;
  isProcessing: boolean;
}

const initialState: State = {
  files: [],
  isLoading: false,
  isProcessing: false,
};

export const Reducer = createReducer(
  initialState,

  on(DriveActions.loadFiles, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(DriveActions.loadFilesSuccess, (state, { files }): State => {
    return { ...state, files, isLoading: false };
  }),
  on(DriveActions.loadFilesFailure, (state): State => {
    return { ...state, isLoading: false };
  }),
  on(DriveActions.uploadFile, (state): State => {
    return { ...state, isProcessing: true };
  }),
  on(DriveActions.uploadFileSuccess, (state): State => {
    return { ...state, isProcessing: false };
  }),
  on(DriveActions.uploadFileFailure, (state): State => {
    return { ...state, isProcessing: false };
  }),
  on(DriveActions.uploadFolder, (state): State => {
    return { ...state, isProcessing: true };
  }),
  on(DriveActions.uploadFolderSuccess, (state): State => {
    return { ...state, isProcessing: false };
  }),
  on(DriveActions.uploadFolderFailure, (state): State => {
    return { ...state, isProcessing: false };
  }),
  on(AuthActions.signOut, (): State => {
    return { isLoading: false, isProcessing: false, files: [] };
  })
);
