export interface FileUploadPayload {
  file: File;
  uid: string;
  parentId?: string;
}

export type FolderUploadPayload = Pick<FileUploadPayload, 'uid'> & {
  name: string;
  parentId?: string;
};
