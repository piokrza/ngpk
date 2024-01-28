export type IFileType = 'file' | 'folder';

export interface IFile {
  name: string;
  url?: string;
  uid: string;
  id: string;
  type: IFileType;
  parentId?: string;
}
