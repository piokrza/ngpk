import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';

import { IUser } from '#auth/models';
import { AppPaths } from '#common/enums';
import { DashobardPaths } from '#dashboard/enums';
import { DriveService } from '#drive/data-access';
import { FileUploadPayload, FolderUploadPayload, IFile } from '#drive/models';
import { AuthSelectors } from '#store/auth';
import { DriveActions, DriveSelectors } from '#store/drive';

@Injectable()
export class DriveFacade {
  private readonly store: Store = inject(Store);
  private readonly router: Router = inject(Router);
  private readonly driveService: DriveService = inject(DriveService);

  public get files$(): Observable<IFile[]> {
    return this.parentId$.pipe(
      switchMap((parentId: string) => {
        return this.store.select(DriveSelectors.files).pipe(map((files) => this.driveService.filterFiles(files, parentId)));
      })
    );
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

  public get parentId$(): Observable<string> {
    return this.driveService.parentId$;
  }

  public get parentFile$(): Observable<IFile | undefined> {
    return this.parentId$.pipe(switchMap((id) => this.store.select(DriveSelectors.fileById(id))));
  }

  public getFolderDetails$(fileId: string): Observable<IFile | undefined> {
    return this.store.select(DriveSelectors.fileById(fileId));
  }

  public setParentId(id: string): void {
    this.driveService.setParentId(id);
  }

  public uploadFile(payload: FileUploadPayload): void {
    this.store.dispatch(DriveActions.uploadFile({ payload }));
  }

  public uploadFolder(payload: FolderUploadPayload): void {
    this.store.dispatch(DriveActions.uploadFolder({ payload }));
  }

  public fileClick(file: IFile): void {
    if (file.type === 'file') {
      window.open(file.url);
    } else {
      this.router.navigate([AppPaths.DASHBOARD, DashobardPaths.DRIVE, file.id]);
    }
  }
}
