import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';
import { Observable } from 'rxjs';

import { Collection } from '#common/enums';
import { IFile } from '#drive/models';

@Injectable({ providedIn: 'root' })
export class DriveApi {
  private readonly fireStorage: AngularFireStorage = inject(AngularFireStorage);
  private readonly angularFirestore: AngularFirestore = inject(AngularFirestore);

  public loadFiles$(uid: string): Observable<IFile[]> {
    const files$: AngularFirestoreCollection<IFile> = this.angularFirestore.collection<IFile>(Collection.FILES, (ref) => {
      return ref.where('uid', '==', uid);
    });

    return files$.valueChanges({ idField: 'id' });
  }

  async uploadFile(file: File, uid: string): Promise<DocumentReference<IFile>> {
    const path: string = `files/${file.name}`;
    const task: UploadTaskSnapshot = await this.fireStorage.upload(path, file);
    const url: string = await task.ref.getDownloadURL();

    return await this.angularFirestore.collection<IFile>(Collection.FILES).add({
      url,
      uid,
      type: 'file',
      name: file.name,
      id: this.angularFirestore.createId(),
    });
  }
}
