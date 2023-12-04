export interface IFile {
  name: string;
  url?: string;
  uid: string;
  id: string;
  type: 'file' | 'folder';
  fileList?: Array<IFile>;
}
