import { Injectable, inject } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';

import { Collection } from '#common/enums';
import { IFile } from '#drive/models';

@Injectable()
export class DriveApi {
  private readonly fireStorage: AngularFireStorage = inject(AngularFireStorage);
  private readonly angularFirestore: AngularFirestore = inject(AngularFirestore);

  async uploadFile(file: File, uid: string): Promise<DocumentReference<IFile>> {
    const path: string = `files/${file.name}`;
    const task: UploadTaskSnapshot = await this.fireStorage.upload(path, file);
    const url: string = await task.ref.getDownloadURL();

    return await this.angularFirestore.collection<IFile>(Collection.FILES).add({ url, uid });
  }
}
