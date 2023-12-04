import { IFile } from '#drive/models';

export interface FileUploadPayload {
  file: File;
  uid: string;
}

export type FolderUploadPayload = Pick<FileUploadPayload, 'uid'> & {
  name: string;
  fileList: IFile[];
};
