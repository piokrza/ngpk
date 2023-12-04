import { createReducer, on } from '@ngrx/store';

import { IFile } from '#drive/models';
import { DriveActions } from '#store/drive';

export const FeatureKey = 'drive';

export interface State {
  files: IFile[] | null;
  isLoading: boolean;
  isProcessing: boolean;
}

const initialState: State = {
  files: null,
  isLoading: false,
  isProcessing: false,
};

export const Reducer = createReducer(
  initialState,

  on(DriveActions.getFiles, (state): State => ({ ...state, isLoading: true })),
  on(DriveActions.getFilesSuccess, (state, { files }): State => ({ ...state, files, isLoading: false })),
  on(DriveActions.getFilesFailure, (state): State => ({ ...state, isLoading: false })),

  on(DriveActions.uploadFile, (state): State => ({ ...state, isProcessing: true })),
  on(DriveActions.uploadFileSuccess, (state): State => ({ ...state, isProcessing: false })),
  on(DriveActions.uploadFileFailure, (state): State => ({ ...state, isProcessing: false }))
);
