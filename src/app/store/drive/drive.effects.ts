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
      exhaustMap(({ file, uid }) => {
        return from(this.driveApi.uploadFile(file, uid)).pipe(
          tap(() => {
            this.toastService.showMessage(
              ToastStatus.SUCCESS,
              this.translate.instant('toastMessage.success'),
              this.translate.instant('toastMessage.addFileSuccess')
            );
          }),
          map(() => DriveActions.uploadFileSuccess()),
          catchError(() => {
            this.toastService.showMessage(
              ToastStatus.SUCCESS,
              this.translate.instant('toastMessage.error'),
              this.translate.instant('toastMessage.addFileError')
            );
            return of(DriveActions.uploadFileFailure());
          })
        );
      })
    );
  });
}
