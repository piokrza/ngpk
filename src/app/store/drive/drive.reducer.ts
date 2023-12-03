import { createReducer, on } from '@ngrx/store';

import { IFile } from '#drive/models';
import { DriveActions } from '#store/drive';

export const FeatureKey = 'drive';

export interface State {
  files: IFile[] | null;
  isLoading: boolean;
}

const initialState: State = {
  files: null,
  isLoading: false,
};

export const Reducer = createReducer(
  initialState,

  on(DriveActions.getFiles, (state): State => ({ ...state, isLoading: true })),
  on(DriveActions.getFilesSuccess, (_, { files }): State => ({ files, isLoading: false })),
  on(DriveActions.getFilesFailure, (state): State => ({ ...state, isLoading: false }))
);
