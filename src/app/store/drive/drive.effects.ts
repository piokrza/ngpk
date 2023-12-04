import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, exhaustMap, from, map, of, tap } from 'rxjs';

import { ToastStatus } from '#common/enums';
import { ToastService } from '#common/services';
import { DriveApi } from '#drive/data-access';
import { IFile } from '#drive/models';
import { DriveActions } from '#store/drive';

@Injectable()
export class DriveEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly driveApi: DriveApi = inject(DriveApi);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly translate: TranslateService = inject(TranslateService);

  public loadFiles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DriveActions.getFiles),
      exhaustMap(({ uid }) => {
        return this.driveApi.loadFiles$(uid).pipe(
          map((files: IFile[]) => DriveActions.getFilesSuccess({ files })),
          catchError(() => {
            return of(DriveActions.getFilesFailure());
          })
        );
      })
    );
  });

  public uploadFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DriveActions.uploadFile),
      exhaustMap(({ payload }) => {
        return from(this.driveApi.uploadFile(payload)).pipe(
          tap(() => this.toastService.showMessage(ToastStatus.SUCCESS, this.tr('success'), this.tr('addFileSuccess'))),
          map(() => DriveActions.uploadFileSuccess()),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, this.tr('error'), this.tr('addFileError'));
            return of(DriveActions.uploadFileFailure());
          })
        );
      })
    );
  });

  public uploadFolder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DriveActions.uploadFolder),
      exhaustMap(({ payload }) => {
        return from(this.driveApi.uploadFolder(payload)).pipe(
          tap(() => this.toastService.showMessage(ToastStatus.SUCCESS, this.tr('success'), this.tr('addFolderSuccess'))),
          map(() => DriveActions.uploadFolderSuccess()),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, this.tr('error'), this.tr('addFolderError'));
            return of(DriveActions.uploadFolderFailure());
          })
        );
      })
    );
  });

  private tr(path: string): string {
    return this.translate.instant('toastMessage.' + path);
  }
}
