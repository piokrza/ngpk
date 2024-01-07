import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, exhaustMap, from, map, of, takeUntil, tap } from 'rxjs';

import { ToastStatus } from '#core/enums';
import { DbSubscriptionService, ToastService } from '#core/services';
import { IFile } from '#drive/models';
import { DriveApiService } from '#drive/services';
import { DriveActions } from '#store/drive';

@Injectable()
export class DriveEffects {
  readonly #actions$ = inject(Actions);
  readonly #toastService = inject(ToastService);
  readonly #driveApiService = inject(DriveApiService);
  readonly #translateService = inject(TranslateService);
  readonly #dbSubscriptionService = inject(DbSubscriptionService);

  public loadFiles$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(DriveActions.loadFiles),
      exhaustMap(({ uid }) => {
        return this.#driveApiService.loadFiles$(uid).pipe(
          map((files: IFile[]) => DriveActions.loadFilesSuccess({ files })),
          takeUntil(this.#dbSubscriptionService.unsubscribe$),
          catchError(() => {
            return of(DriveActions.loadFilesFailure());
          })
        );
      })
    );
  });

  public uploadFile$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(DriveActions.uploadFile),
      exhaustMap(({ payload }) => {
        return from(this.#driveApiService.uploadFile(payload)).pipe(
          tap(() => this.#toastService.showMessage(ToastStatus.SUCCESS, this.tr('success'), this.tr('addFileSuccess'))),
          map(() => DriveActions.uploadFileSuccess()),
          catchError(() => {
            this.#toastService.showMessage(ToastStatus.SUCCESS, this.tr('error'), this.tr('addFileError'));
            return of(DriveActions.uploadFileFailure());
          })
        );
      })
    );
  });

  public uploadFolder$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(DriveActions.uploadFolder),
      exhaustMap(({ payload }) => {
        return from(this.#driveApiService.uploadFolder(payload)).pipe(
          tap(() => this.#toastService.showMessage(ToastStatus.SUCCESS, this.tr('success'), this.tr('addFolderSuccess'))),
          map(() => DriveActions.uploadFolderSuccess()),
          catchError(() => {
            this.#toastService.showMessage(ToastStatus.SUCCESS, this.tr('error'), this.tr('addFolderError'));
            return of(DriveActions.uploadFolderFailure());
          })
        );
      })
    );
  });

  private tr(path: string): string {
    return this.#translateService.instant('toastMessage.' + path);
  }
}
