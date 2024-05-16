import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, exhaustMap, from, map, of, takeUntil, tap } from 'rxjs';

import { FirestoreDbSubscriptionService, ToastService } from '@ngpk/core//service';
import { ToastStatus } from '@ngpk/core/enum';
import { DriveApiService } from '@ngpk/organizer/api';
import { IFile } from '@ngpk/organizer/model';
import { DriveActions } from '@ngpk/organizer/state/drive';

@Injectable()
export class DriveEffects {
  private readonly actions$ = inject(Actions);
  private readonly toastService = inject(ToastService);
  private readonly driveApiService = inject(DriveApiService);
  private readonly translateService = inject(TranslateService);
  private readonly firestoreDbSubscriptionService = inject(FirestoreDbSubscriptionService);

  loadFiles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DriveActions.loadFiles),
      exhaustMap(({ uid }) => {
        return this.driveApiService.loadFiles$(uid).pipe(
          map((files: IFile[]) => DriveActions.loadFilesSuccess({ files })),
          takeUntil(this.firestoreDbSubscriptionService.unsubscribe$),
          catchError(() => {
            return of(DriveActions.loadFilesFailure());
          })
        );
      })
    );
  });

  uploadFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DriveActions.uploadFile),
      exhaustMap(({ payload }) => {
        return from(this.driveApiService.uploadFile(payload)).pipe(
          tap(() => this.toastService.showMessage(ToastStatus.SUCCESS, this.tr('success'), this.tr('addFileSuccess'))),
          map(() => DriveActions.uploadFileSuccess()),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('addFileError'));
            return of(DriveActions.uploadFileFailure());
          })
        );
      })
    );
  });

  uploadFolder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DriveActions.uploadFolder),
      exhaustMap(({ payload }) => {
        return from(this.driveApiService.uploadFolder(payload)).pipe(
          tap(() => this.toastService.showMessage(ToastStatus.SUCCESS, this.tr('success'), this.tr('addFolderSuccess'))),
          map(() => DriveActions.uploadFolderSuccess()),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, this.tr('error'), this.tr('addFolderError'));
            return of(DriveActions.uploadFolderFailure());
          })
        );
      })
    );
  });

  private tr(path: string): string {
    return this.translateService.instant('toastMessage.' + path);
  }
}
