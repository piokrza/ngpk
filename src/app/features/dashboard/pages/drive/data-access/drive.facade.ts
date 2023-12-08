import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IUser } from '#auth/models';
import { FileUploadPayload, FolderUploadPayload, IFile } from '#drive/models';
import { AuthSelectors } from '#store/auth';
import { DriveActions, DriveSelectors } from '#store/drive';

@Injectable()
export class DriveFacade {
  private readonly store: Store = inject(Store);

  public get files$(): Observable<IFile[] | null> {
    return this.store.select(DriveSelectors.files);
  }

  public get isLoading$(): Observable<boolean> {
    return this.store.select(DriveSelectors.isLoading);
  }

  public get isProcessing$(): Observable<boolean> {
    return this.store.select(DriveSelectors.isProcessing);
  }

  public get user$(): Observable<IUser | null> {
    return this.store.select(AuthSelectors.user);
  }

  public getFolderDetails$(fileId: string): Observable<IFile | undefined> {
    return this.store.select(DriveSelectors.fileById(fileId));
  }

  public uploadFile(payload: FileUploadPayload): void {
    this.store.dispatch(DriveActions.uploadFile({ payload }));
  }

  public uploadFolder(payload: FolderUploadPayload): void {
    this.store.dispatch(DriveActions.uploadFolder({ payload }));
  }
}
