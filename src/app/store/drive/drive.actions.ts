import { createAction, props } from '@ngrx/store';

import { IFile } from '#dashboard/features/drive/models';
import { ActionTypes } from '#store/drive/action-types';

export const getFiles = createAction(ActionTypes.LOAD_FILES, props<{ uid: string }>());
export const getFilesSuccess = createAction(ActionTypes.LOAD_FILES_SUCCESS, props<{ files: IFile[] }>());
export const getFilesFailure = createAction(ActionTypes.LOAD_FILES_FAILURE);

export const uploadFile = createAction(ActionTypes.UPLOAD_FILE, props<{ file: File; uid: string }>());
export const uploadFileSuccess = createAction(ActionTypes.UPLOAD_FILE_SUCCESS);
export const uploadFileFailure = createAction(ActionTypes.UPLOAD_FILE_FAILURE);
