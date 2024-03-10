import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';
import { Observable } from 'rxjs';

import { Collection } from '@ngpk/core/enum';
import { FileUploadPayload, FolderUploadPayload, IFile } from '#drive/models';

@Injectable({ providedIn: 'root' })
export class DriveApiService {
  private readonly fireStorage: AngularFireStorage = inject(AngularFireStorage);
  private readonly angularFirestore: AngularFirestore = inject(AngularFirestore);

  loadFiles$(uid: string): Observable<IFile[]> {
    const files$: AngularFirestoreCollection<IFile> = this.angularFirestore.collection<IFile>(Collection.FILES, (ref) => {
      return ref.where('uid', '==', uid);
    });

    return files$.valueChanges({ idField: 'id' });
  }

  async uploadFile({ file, uid, parentId }: FileUploadPayload): Promise<DocumentReference<IFile>> {
    const path: string = `files/${file.name}`;
    const task: UploadTaskSnapshot = await this.fireStorage.upload(path, file);
    const url: string = await task.ref.getDownloadURL();

    return await this.angularFirestore.collection<IFile>(Collection.FILES).add({
      url,
      uid,
      parentId,
      type: 'file',
      name: file.name,
      id: this.angularFirestore.createId(),
    });
  }

  async uploadFolder({ uid, name, parentId }: FolderUploadPayload): Promise<DocumentReference<IFile>> {
    return await this.angularFirestore.collection<IFile>(Collection.FILES).add({
      uid,
      name,
      parentId,
      type: 'folder',
      id: this.angularFirestore.createId(),
    });
  }
}
