import { IFile } from '../models';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IUser } from '#auth/models';
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

  public get user$(): Observable<IUser | null> {
    return this.store.select(AuthSelectors.user);
  }

  public uploadFile(file: File, uid: string): void {
    this.store.dispatch(DriveActions.uploadFile({ file, uid }));
  }
}
