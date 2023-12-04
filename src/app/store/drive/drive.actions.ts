import { createAction, props } from '@ngrx/store';

import { FileUploadPayload, FolderUploadPayload, IFile } from '#drive/models';
import { ActionTypes } from '#store/drive/action-types';

export const getFiles = createAction(ActionTypes.LOAD_FILES, props<{ uid: string }>());
export const getFilesSuccess = createAction(ActionTypes.LOAD_FILES_SUCCESS, props<{ files: IFile[] }>());
export const getFilesFailure = createAction(ActionTypes.LOAD_FILES_FAILURE);

export const uploadFile = createAction(ActionTypes.UPLOAD_FILE, props<{ payload: FileUploadPayload }>());
export const uploadFileSuccess = createAction(ActionTypes.UPLOAD_FILE_SUCCESS);
export const uploadFileFailure = createAction(ActionTypes.UPLOAD_FILE_FAILURE);

export const uploadFolder = createAction(ActionTypes.UPLOAD_FOLDER, props<{ payload: FolderUploadPayload }>());
export const uploadFolderSuccess = createAction(ActionTypes.UPLOAD_FOLDER_SUCCESS);
export const uploadFolderFailure = createAction(ActionTypes.UPLOAD_FOLDER_FAILURE);
